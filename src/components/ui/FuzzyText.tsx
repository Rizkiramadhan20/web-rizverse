import React, { useEffect, useRef } from "react";

interface FuzzyTextProps {
    children: React.ReactNode;
    fontSize?: number | string;
    fontWeight?: string | number;
    fontFamily?: string;
    color?: string;
    enableHover?: boolean;
    baseIntensity?: number;
    hoverIntensity?: number;
    className?: string;
    style?: React.CSSProperties;
}

const FuzzyText: React.FC<FuzzyTextProps> = ({
    children,
    fontSize = "clamp(2rem, 8vw, 8rem)",
    fontWeight = 900,
    fontFamily = "inherit",
    color = "#fff",
    enableHover = true,
    baseIntensity = 0.18,
    hoverIntensity = 0.5,
    className,
    style,
}) => {
    const canvasRef = useRef<HTMLCanvasElement & { cleanupFuzzyText?: () => void }>(null);

    useEffect(() => {
        let animationFrameId: number;
        let isCancelled = false;
        const canvas = canvasRef.current;
        if (!canvas) return;

        const init = async () => {
            if (document.fonts?.ready) {
                await document.fonts.ready;
            }
            if (isCancelled) return;

            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            const computedFontFamily =
                fontFamily === "inherit"
                    ? window.getComputedStyle(canvas).fontFamily || "sans-serif"
                    : fontFamily;

            const fontSizeStr =
                typeof fontSize === "number" ? `${fontSize}px` : fontSize;
            let numericFontSize: number;
            if (typeof fontSize === "number") {
                numericFontSize = fontSize;
            } else {
                const temp = document.createElement("span");
                temp.style.fontSize = fontSize;
                document.body.appendChild(temp);
                const computedSize = window.getComputedStyle(temp).fontSize;
                numericFontSize = parseFloat(computedSize);
                document.body.removeChild(temp);
            }

            const text = React.Children.toArray(children).join("");

            const offscreen = document.createElement("canvas");
            const offCtx = offscreen.getContext("2d");
            if (!offCtx) return;

            offCtx.font = `${fontWeight} ${fontSizeStr} ${computedFontFamily}`;
            offCtx.textBaseline = "alphabetic";
            const metrics = offCtx.measureText(text);

            const actualLeft = metrics.actualBoundingBoxLeft ?? 0;
            const actualRight = metrics.actualBoundingBoxRight ?? metrics.width;
            const actualAscent = metrics.actualBoundingBoxAscent ?? numericFontSize;
            const actualDescent =
                metrics.actualBoundingBoxDescent ?? numericFontSize * 0.2;

            const textBoundingWidth = Math.ceil(actualLeft + actualRight);
            const tightHeight = Math.ceil(actualAscent + actualDescent);

            const extraWidthBuffer = 10;
            const offscreenWidth = textBoundingWidth + extraWidthBuffer;

            offscreen.width = offscreenWidth;
            offscreen.height = tightHeight;

            const xOffset = extraWidthBuffer / 2;
            offCtx.font = `${fontWeight} ${fontSizeStr} ${computedFontFamily}`;
            offCtx.textBaseline = "alphabetic";
            offCtx.fillStyle = color;
            offCtx.fillText(text, xOffset - actualLeft, actualAscent);

            const horizontalMargin = Math.max(16, Math.round(numericFontSize * 0.25));
            const verticalMargin = 0;

            const dpr = window.devicePixelRatio || 1;
            const idealWidth = offscreenWidth + horizontalMargin * 2;
            const idealHeight = tightHeight + verticalMargin * 2;

            // Respect container width if available
            const containerWidth = canvas.clientWidth || idealWidth;
            const scale = Math.max(0.1, Math.min(2, containerWidth / idealWidth));
            const cssWidth = containerWidth;
            const cssHeight = Math.ceil(idealHeight * scale);

            canvas.width = Math.floor(cssWidth * dpr);
            canvas.height = Math.floor(cssHeight * dpr);
            // Set only height to preserve aspect; width is controlled by container
            canvas.style.height = `${cssHeight}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.scale(scale, scale);
            ctx.translate(horizontalMargin, verticalMargin);

            // Interactive bounds in CSS pixel space
            const interactiveLeft = (horizontalMargin + xOffset) * scale;
            const interactiveTop = (verticalMargin) * scale;
            const interactiveRight = interactiveLeft + textBoundingWidth * scale;
            const interactiveBottom = interactiveTop + tightHeight * scale;

            let isHovering = false;
            const fuzzRange = 30;

            const run = () => {
                if (isCancelled) return;
                ctx.clearRect(
                    -fuzzRange,
                    -fuzzRange,
                    offscreenWidth + 2 * fuzzRange,
                    tightHeight + 2 * fuzzRange
                );
                const intensity = isHovering ? hoverIntensity : baseIntensity;
                for (let j = 0; j < tightHeight; j++) {
                    const dx = Math.floor(intensity * (Math.random() - 0.5) * fuzzRange);
                    ctx.drawImage(
                        offscreen,
                        0,
                        j,
                        offscreenWidth,
                        1,
                        dx,
                        j,
                        offscreenWidth,
                        1
                    );
                }
                animationFrameId = window.requestAnimationFrame(run);
            };

            run();

            const isInsideTextArea = (x: number, y: number) =>
                x >= interactiveLeft &&
                x <= interactiveRight &&
                y >= interactiveTop &&
                y <= interactiveBottom;

            const handleMouseMove = (e: MouseEvent) => {
                if (!enableHover) return;
                const rect = canvas.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                isHovering = isInsideTextArea(x, y);
            };

            const handleMouseLeave = () => {
                isHovering = false;
            };

            const handleTouchMove = (e: TouchEvent) => {
                if (!enableHover) return;
                e.preventDefault();
                const rect = canvas.getBoundingClientRect();
                const touch = e.touches[0];
                const x = touch.clientX - rect.left;
                const y = touch.clientY - rect.top;
                isHovering = isInsideTextArea(x, y);
            };

            const handleTouchEnd = () => {
                isHovering = false;
            };

            if (enableHover) {
                canvas.addEventListener("mousemove", handleMouseMove);
                canvas.addEventListener("mouseleave", handleMouseLeave);
                canvas.addEventListener("touchmove", handleTouchMove, {
                    passive: false,
                });
                canvas.addEventListener("touchend", handleTouchEnd);
            }

            const cleanup = () => {
                window.cancelAnimationFrame(animationFrameId);
                if (enableHover) {
                    canvas.removeEventListener("mousemove", handleMouseMove);
                    canvas.removeEventListener("mouseleave", handleMouseLeave);
                    canvas.removeEventListener("touchmove", handleTouchMove);
                    canvas.removeEventListener("touchend", handleTouchEnd);
                }
                window.removeEventListener("resize", handleResize);
                resizeObserver?.disconnect();
            };

            canvas.cleanupFuzzyText = cleanup;
            const handleResize = () => {
                if (isCancelled) return;
                cleanup();
                // Re-run initialization to adapt to new size
                init();
            };
            window.addEventListener("resize", handleResize);

            // Observe container size changes for responsive redraw
            const resizeObserver = new ResizeObserver(() => {
                handleResize();
            });
            resizeObserver.observe(canvas);
        };

        init();

        return () => {
            isCancelled = true;
            window.cancelAnimationFrame(animationFrameId);
            if (canvas && canvas.cleanupFuzzyText) {
                canvas.cleanupFuzzyText();
            }
        };
    }, [
        children,
        fontSize,
        fontWeight,
        fontFamily,
        color,
        enableHover,
        baseIntensity,
        hoverIntensity,
    ]);

    return (
        <canvas
            ref={canvasRef}
            className={className}
            style={{ display: "block", ...style }}
        />
    );
};

export default FuzzyText;
