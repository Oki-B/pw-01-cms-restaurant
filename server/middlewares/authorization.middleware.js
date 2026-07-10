// Role-Based Access Control
function requireRoles(...allowedRoles) {
  return (req, res, next) => {
    try {
      const { role } = req.user;

      if (!allowedRoles.includes(role)) {
        throw {
          name: "Forbidden",
          message: "Anda tidak memiliki izin untuk mengakses halaman ini",
        };
      }
      next();
    } catch (err) {
      next(err);
    }
  };
}

// Data Ownership and Permission
function authorizeOwnership(Model, foreignKeyField, resourceName) {
  return async (req, res, next) => {
    try {
      const resourceId = req.params.id;
      const { id, role } = req.user;

      const resource = await Model.findByPk(+resourceId);
      if (!resource)
        throw { name: "NotFound", message: `${resourceName} tidak ditemukan` };

      req.resources = resource;

      if (role === "staff") {
        const ownerId =
          foreignKeyField === `id` ? resource.id : resource[foreignKeyField];

        if (ownerId != id) {
          throw {
            name: "Forbidden",
            message: `Anda tidak diperbolehkan memodifikasi ${resourceName} ini`,
          };
        }
      }
      next();
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
}

module.exports = { requireRoles, authorizeOwnership };
