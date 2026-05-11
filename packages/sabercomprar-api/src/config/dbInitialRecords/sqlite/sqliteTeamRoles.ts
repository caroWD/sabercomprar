import { v7 as UUIDv7 } from 'uuid'
import type { teamRolesTableSqlite } from '../../../db/sqliteSchema.js'

export const sqliteTeamRoles: (typeof teamRolesTableSqlite.$inferInsert)[] = [
  {
    id: UUIDv7(),
    slug: 'team-owner',
    name: 'Team owner',
    description:
      'Control total sobre el equipo. Es el único que puede eliminar el equipo o gestionar suscripciones. Tiene todos los permisos de administración, edición y lectura.',
  },
  {
    id: UUIDv7(),
    slug: 'team-manager',
    name: 'Team manager',
    description:
      'Gestiona la operatividad del grupo. Puede invitar o eliminar miembros, crear tableros y gestionar todas las listas, pero no puede eliminar el equipo.',
  },
  {
    id: UUIDv7(),
    slug: 'list-editor',
    name: 'List editor',
    description:
      'Rol enfocado en la ejecución. Puede crear tableros y listas, agregar o eliminar productos y actualizar precios, pero no tiene permisos para gestionar miembros del equipo.',
  },
  {
    id: UUIDv7(),
    slug: 'contributor',
    name: 'Contributor',
    description:
      'Rol operativo para el momento de la compra. Puede ver las listas y actualizar cantidades o marcar productos como comprados (update), pero no puede crear nuevas listas o tableros.',
  },
  {
    id: UUIDv7(),
    slug: 'observer',
    name: 'Observer',
    description:
      'Acceso de solo lectura. Útil para miembros que solo necesitan consultar los reportes de gastos o ver qué se necesita comprar sin modificar la información.',
  },
]
