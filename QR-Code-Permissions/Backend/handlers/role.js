import {
  createRoleEntry,
  getAllRoleEntriesForOrg,
  updateRoleEntry,
} from "../DB/CRUD/role.js";

export async function createRole(data) {
  try {
    const { roleName, permissions, organizationId } = data;
    const permissionsJson = JSON.stringify(permissions);
    const roleData = await createRoleEntry({
      roleName,
      permissionsJson,
      organizationId,
    });
    return { status: 200, message: roleData.role_id * 1007 };
  } catch (err) {
    console.log(err);
    return { status: 500, message: "Internal server error" };
  }
}

export async function updateRole(publicRoleID, data) {
  try {
    const roleID = publicRoleID / 1007;
    const { roleName, permissions, organizationId } = data;
    const permissionsJSON = JSON.stringify(permissions);
    const roleData = await updateRoleEntry(roleID, organizationId, {
      roleName,
      permissionsJSON,
    });
    if (roleData) {
      return { status: 200, message: roleData.role_id * 1007 };
    } else {
      return { status: 400, message: "No such role exist" };
    }
  } catch (err) {
    console.log(err);
    return { status: 500, message: "Internal server error" };
  }
}

export async function getAllRoles(organizationId) {
  try {
    const allRolesInOrg = await getAllRoleEntriesForOrg(organizationId);
    return { status: 200, message: allRolesInOrg };
  } catch (err) {
    console.log(err);
    return { status: 500, message: "Internal server error" };
  }
}
