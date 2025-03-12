import { RoleQR } from "../DataModel/qr.js";

async function createRoleQREntry({
  roleID,
  eventID,
  expiryTime,
  qrImage,
  maxScans,
}) {
  const roleQRData = await RoleQR.create({
    role_id: roleID,
    event_id: eventID,
    expiry_time: expiryTime,
    qr_image: qrImage,
    qr_is_active: true,
    max_scans: maxScans || 100,
  });

  return roleQRData;
}

async function deactivateQR(roleQRId) {
  const roleQRData = await RoleQR.findOne({
    where: { role_qr_id: roleQRId },
  });

  if (roleQRData) {
    roleQRData.set({ qr_is_active: false });
    await roleQRData.save();
  }
  return roleQRData;
}

export { createRoleQREntry, deactivateQR };
