import { createCanvas, loadImage } from "canvas";
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";
import fetch from "node-fetch";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const canvasWidth = 1200;
const canvasHeight = 630;
const padding = 50;
const lineHeight = 40;
const logoSize = 60;
const titleMaxWidth = canvasWidth - 2 * padding;

function wrapText(ctx, text, x, y, maxWidth) {
  const words = text.split(" ");
  let line = "";
  let lines = [];

  for (const word of words) {
    const testLine = line + word + " ";
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && line.length > 0) {
      lines.push(line);
      line = word + " ";
    } else {
      line = testLine;
    }
  }

  lines.push(line);
  console.log(lines);
  return lines;
}

export default async function generateOgImage(
  { title, content, imageUrl },
  postId
) {
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const ctx = canvas.getContext("2d");

  if (imageUrl) {
    try {
      const response = await fetch(imageUrl);
      const buffer = await response.buffer();

      // Convert to PNG using sharp
      const convertedBuffer = await sharp(buffer).toFormat("png").toBuffer();
      const image = await loadImage(convertedBuffer);
      const imageWidth = canvasWidth;
      const imageHeight =
        (image.naturalHeight / image.naturalWidth) * imageWidth; // Preserve aspect ratio
      console.log("Image Loaded: ", image.naturalWidth, image.naturalHeight);
      const imageY = 0; // Position at bottom

      ctx.drawImage(image, 0, imageY, imageWidth, imageHeight);

      //top black gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, 150);
      gradient.addColorStop(0, "rgba(0, 0, 0, 1)");
      gradient.addColorStop(0.5, "rgba(0, 0, 0, 0.5)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvasWidth, 150);

      //bottom black gradient
      const bottomGradient = ctx.createLinearGradient(
        0,
        canvasHeight - 250,
        0,
        canvasHeight
      );
      bottomGradient.addColorStop(0, "rgba(0, 0, 0, 0.)");
      bottomGradient.addColorStop(0.5, "rgba(0, 0, 0, 0.6)");
      bottomGradient.addColorStop(1, "rgba(0, 0, 0, 1)");
      ctx.fillStyle = bottomGradient;
      ctx.fillRect(0, canvasHeight - 250, canvasWidth, 250);

      //title
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 35px Arial";
      const titleLines = wrapText(
        ctx,
        title,
        padding,
        100,
        canvasWidth - 2 * padding
      );
      const titleYStart = canvasHeight - titleLines.length * lineHeight;
      titleLines.forEach((line, index) => {
        ctx.fillText(line, padding, titleYStart + 40 * index);
      });
    } catch (error) {
      console.error("Error loading image:", error);
    }
  } else {
    //title
    ctx.fillStyle = "#000000";
    ctx.font = "bold 50px Arial";
    const titleLines = wrapText(
      ctx,
      title,
      padding,
      100,
      canvasWidth - 2 * padding
    );
    let titleY = 170;
    titleLines.forEach((line, index) => {
      ctx.fillText(line, padding, titleY + 60 * index);
    });
    titleY += titleLines.length * 60;

    // Content
    ctx.fillStyle = "#000000";
    ctx.font = "30px Arial";
    const contentLines = wrapText(
      ctx,
      content,
      padding,
      200,
      canvasWidth - 2 * padding
    );
    let contentY = titleY;
    contentLines.forEach((line, index) => {
      ctx.fillText(line, padding, contentY + lineHeight * index);
    });

    //add gradient
    const gradient = ctx.createLinearGradient(
      0,
      canvasHeight - 200,
      0,
      canvasHeight
    );
    gradient.addColorStop(0, "rgba(255, 255, 255, 0)"); // Transparent
    gradient.addColorStop(0.6, "rgba(255, 255, 255, 0.5)"); // Semi-transparent white
    gradient.addColorStop(1, "rgba(255, 255, 255, 1)"); // Solid white
    ctx.fillStyle = gradient;
    ctx.fillRect(0, canvasHeight - 200, canvasWidth, 200); // Adjust size and position of the gradient}
  }

  // Username and Logo
  const usernameY = 70; // Set vertical position for username
  const logoY = 40;
  ctx.fillStyle = imageUrl ? "#ffffff" : "#4a5568"; // Color for the username
  ctx.font = "bold 35px Arial";
  ctx.fillText("@username", padding, usernameY); // Place the username at the top left

  // Add logo
  try {
    const logo = await loadImage(
      path.join(__dirname, "../public", "/logo.svg")
    );
    ctx.drawImage(
      logo,
      canvasWidth - logoSize - padding,
      logoY,
      logoSize,
      logoSize
    ); // Position and size
  } catch (error) {
    console.error("Error loading logo:", error);
  }

  const buffer = canvas.toBuffer("image/png");
  const filePath = path.join(__dirname, "../public", `${postId}.png`); // Use path module to construct the path
  await fs.writeFile(filePath, buffer);
}
