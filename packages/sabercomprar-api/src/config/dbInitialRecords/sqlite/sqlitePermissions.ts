import { v7 as UUIDv7 } from 'uuid'
import type { permissionsTableSqlite } from '../../../db/sqliteSchema.js'

export const sqlitePermissions: (typeof permissionsTableSqlite.$inferInsert)[] =
  [
    {
      id: UUIDv7(),
      slug: 'system-config-view',
      name: 'System config view',
      description:
        'Permite visualizar las configuraciones generales del sistema y logs de auditoría.',
    },
    {
      id: UUIDv7(),
      slug: 'system-config-manage',
      name: 'System config manage',
      description:
        'Permite modificar variables de entorno, límites de la plataforma y mantenimiento técnico.',
    },
    {
      id: UUIDv7(),
      slug: 'users-view',
      name: 'Users view',
      description:
        'Permite listar y ver perfiles de usuarios registrados en la plataforma.',
    },
    {
      id: UUIDv7(),
      slug: 'users-manage',
      name: 'Users manage',
      description:
        'Permite suspender, reactivar o modificar roles globales de cualquier usuario.',
    },
    {
      id: UUIDv7(),
      slug: 'teams-view-all',
      name: 'Teams view all',
      description:
        'Permite visualizar todos los equipos creados en la plataforma (fines de moderación).',
    },
    {
      id: UUIDv7(),
      slug: 'catalog-products-manage',
      name: 'Catalog products manage',
      description:
        'Permite crear, editar y eliminar productos del catálogo maestro global.',
    },
    {
      id: UUIDv7(),
      slug: 'catalog-brands-manage',
      name: 'Catalog brands manage',
      description:
        'Permite gestionar el listado oficial de marcas disponibles.',
    },
    {
      id: UUIDv7(),
      slug: 'catalog-supermarkets-manage',
      name: 'Catalog supermarkets manage',
      description:
        'Permite administrar la base de datos de supermercados y cadenas comerciales.',
    },
    {
      id: UUIDv7(),
      slug: 'catalog-presentations-manage',
      name: 'Catalog presentations manage',
      description:
        'Permite definir las unidades de medida y formatos de empaque del sistema.',
    },
    {
      id: UUIDv7(),
      slug: 'reports-global-view',
      name: 'Reports global view',
      description:
        'Permite acceder a métricas agregadas de consumo y tendencias de precios a nivel plataforma.',
    },
  ]
