import { Role } from "../DataModel/role.js";

async function createRoleEntry({ roleName, permissionsJson, organizationId }) {
  const roleData = await Role.create({
    role_name: roleName,
    permissions: permissionsJson,
    organization_id: organizationId,
  });

  return roleData;
}

async function updateRoleEntry(
  roleId,
  organizationId,
  { roleName, permissionsJSON }
) {
  const roleData = await Role.findOne({
    where: { role_id: roleId, organization_id: organizationId },
  });

  if (roleData) {
    roleData.set({
      role_name: roleName,
      permissions: permissionsJSON,
    });
    await roleData.save();
    console.log(roleData);
  }
  return roleData;
}

async function getAllRoleEntriesForOrg(organizationId) {
  const allRoles = await Role.findAll({
    where: { organization_id: organizationId },
  });
  return allRoles;
}

export { createRoleEntry, updateRoleEntry, getAllRoleEntriesForOrg };
