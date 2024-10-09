import { json } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import qr from "qr-image";

// Helper to convert PNG to Base64
const streamToBase64 = (stream) => {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("base64")));
    stream.on("error", reject);
  });
};

export async function action({ request }) {
  const formData = await request.formData();
  const link = formData.get("link");

  // QR code generation of SVG type
  const svgString = qr.imageSync(link, { type: "svg" });

  // QR code generation of PNG type
  const pngStream = qr.image(link, { type: "png" });
  const pngBase64 = await streamToBase64(pngStream);

  // Send back both the SVG and the PNG base64 encoded data
  return json({ svgString, pngBase64, link });
}

export default function Submit() {
  const actionData = useActionData();

  if (!actionData) {
    return (
      <p className="text-gray-100">
        No code submitted, submit a link to generate a QR code.
      </p>
    );
  }

  const { svgString, pngBase64, link } = actionData;

  return (
    <div className="text-gray-100">
      <h1 className="text-4xl font-bold text-gray-100">
        Here is your QR Code:
      </h1>
      <p className="text-center text-blue-200 text-xl pb-2">{link}</p>

      {link && (
        <>
          <div className="flex justify-center p-4">
            {/* Render the QR Code SVG */}
            <div
              className="bg-white rounded-lg w-full h-full"
              id="qr-image"
              dangerouslySetInnerHTML={{ __html: svgString }}
            />
          </div>

          {/* Option to download SVG */}
          <div className="flex justify-between py-4">
            <a
              className="bg-blue-200 text-gray-600 hover:bg-gray-600 hover:text-blue-200 rounded-lg p-3"
              href={`data:image/svg+xml;base64,${btoa(svgString)}`}
              download="qrcode.svg"
            >
              Download SVG
            </a>

            {/* Option to download PNG */}
            <a
              className="bg-blue-200 text-gray-600 hover:bg-gray-600 hover:text-blue-200 rounded-lg p-3"
              href={`data:image/png;base64,${pngBase64}`}
              download="qrcode.png"
            >
              Download PNG
            </a>
          </div>
        </>
      )}
    </div>
  );
}
