import formidable from "formidable";
import fs from "fs";
import FormData from "form-data";
import axios from "axios";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { files } = await new Promise((resolve, reject) => {
      const form = formidable({
        multiples: false,
        keepExtensions: true,
      });

      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    });

    const image = files.image?.[0] || files.image;

    if (!image) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }

    const formData = new FormData();

    formData.append(
      "media",
      fs.createReadStream(image.filepath)
    );

    formData.append("models", "genai");
    formData.append("api_user", process.env.SIGHTENGINE_API_USER);
    formData.append("api_secret", process.env.SIGHTENGINE_API_SECRET);

    const response = await axios.post(
      "https://api.sightengine.com/1.0/check.json",
      formData,
      {
        headers: formData.getHeaders(),
      }
    );

    return res.status(200).json({
      success: true,
      result: response.data,
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
                 }
