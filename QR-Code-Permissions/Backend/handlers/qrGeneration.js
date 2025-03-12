import QRCode from "qrcode";
import { createRoleQREntry, deactivateQR } from "../DB/CRUD/qr.js";

function generateQRCode(url) {
  return new Promise((resolve, reject) => {
    QRCode.toDataURL(url, function (error, generatedUrl) {
      if (error) {
        reject(error);
      }
      resolve(generatedUrl);
    });
  });
}

export async function getQRCode(publicRoleId, eventId, data) {
  try {
    const { expiryTime, maxScans } = data;
    const roleId = publicRoleId / 1007;
    const qrImage = await generateQRCode(
      `www.mysite.com/signin/?rid=${publicRoleId}-${eventId}`
    );

    const qrCodeEntry = await createRoleQREntry({
      roleId,
      eventId,
      expiryTime,
      qrImage,
      maxScans,
    });
    return {
      status: 200,
      message: { roleQrID: qrCodeEntry.role_qr_id, qrImage },
    };
  } catch (e) {
    console.log(e);
    return { status: 500, message: "Internal server error" };
  }
}

export async function deactiveQRWithId(roleQrId) {
  try {
    const deactivatedQr = await deactivateQR(roleQrId);
    return { status: 200, message: deactivatedQr.role_qr_id };
  } catch (e) {
    console.log(e);
    return { status: 500, message: "Internal server error" };
  }
}
