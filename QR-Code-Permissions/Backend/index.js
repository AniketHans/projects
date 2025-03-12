import express from "express";
import { deactiveQRWithId, getQRCode } from "./handlers/qrGeneration.js";
import cors from "cors";
import { createRole, getAllRoles, updateRole } from "./handlers/role.js";
const app = express();
const port = 3004;

app.use(express.json());
app.use(cors());

app.post("/api/role", async (req, res) => {
  const data = req.body;
  const { status, message } = await createRole(data);
  res.status(status).json({
    message,
  });
});

app.put("/api/role/:publicRoleId", async (req, res) => {
  const { publicRoleId } = req.params;
  const data = req.body;
  const { status, message } = await updateRole(publicRoleId, data);
  console.log(status);
  res.status(status).json({
    message: message,
  });
});

app.get("/api/organization/:organizationId/all-roles", async (req, res) => {
  const { organizationId } = req.params;
  const { status, message } = await getAllRoles(organizationId);
  console.log(status);
  res.status(status).json({
    message: message,
  });
});

app.post(
  "/api/event/:eventId/role/:publicRoleId/generate-qr-code",
  async (req, res) => {
    const { publicRoleId, eventId } = req.params;
    const data = req.body;
    const { status, message } = await getQRCode(publicRoleId, eventId, data);
    console.log(status);
    res.status(status).json({
      message: message,
    });
  }
);

app.put("/api/qr/:roleQrId/deactivate", async (req, res) => {
  const { roleQrId } = req.params;
  const { status, message } = await deactiveQRWithId(roleQrId);
  console.log(status);
  res.status(status).json({
    message: message,
  });
});

app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});
