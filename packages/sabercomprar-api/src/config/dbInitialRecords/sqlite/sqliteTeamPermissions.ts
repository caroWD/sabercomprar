import { v7 as UUIDv7 } from 'uuid'
import type { teamPermissionsTableSqlite } from '../../../db/sqliteSchema.js'

export const sqliteTeamPermissions: (typeof teamPermissionsTableSqlite.$inferInsert)[] =
  [
    {
      id: UUIDv7(),
      slug: 'team-members-manage',
      name: 'Team members manage',
      description:
        'Permite invitar nuevos miembros, eliminar integrantes o cambiar sus roles dentro del equipo.',
    },
    {
      id: UUIDv7(),
      slug: 'team-settings-edit',
      name: 'Team settings edit',
      description:
        'Permite modificar el nombre, la descripción o la configuración de privacidad del equipo.',
    },
    {
      id: UUIDv7(),
      slug: 'team-delete',
      name: 'Team delete',
      description:
        'Permite eliminar el equipo de forma permanente junto con todos sus tableros y listas.',
    },
    {
      id: UUIDv7(),
      slug: 'board-create',
      name: 'Board create',
      description:
        'Permite crear nuevos tableros dentro del equipo para organizar diferentes grupos de listas.',
    },
    {
      id: UUIDv7(),
      slug: 'board-edit',
      name: 'Board edit',
      description:
        'Permite renombrar o cambiar la descripción de los tableros existentes.',
    },
    {
      id: UUIDv7(),
      slug: 'board-delete',
      name: 'Board delete',
      description:
        'Permite eliminar tableros y desvincular las listas asociadas a ellos.',
    },
    {
      id: UUIDv7(),
      slug: 'list-create',
      name: 'List create',
      description: 'Permite crear nuevas listas de compras dentro del equipo.',
    },
    {
      id: UUIDv7(),
      slug: 'list-view',
      name: 'List view',
      description:
        'Permite visualizar el contenido y los detalles de las listas de compras del equipo.',
    },
    {
      id: UUIDv7(),
      slug: 'list-products-add',
      name: 'List products add',
      description:
        'Permite agregar nuevos productos a una lista de compras existente.',
    },
    {
      id: UUIDv7(),
      slug: 'list-products-update',
      name: 'List products update',
      description:
        'Permite marcar productos como comprados, editar cantidades o actualizar precios en la lista.',
    },
    {
      id: UUIDv7(),
      slug: 'list-products-remove',
      name: 'List products remove',
      description: 'Permite eliminar productos de una lista de compras.',
    },
    {
      id: UUIDv7(),
      slug: 'list-delete',
      name: 'List delete',
      description: 'Permite eliminar una lista de compras completa.',
    },
    {
      id: UUIDv7(),
      slug: 'team-reports-view',
      name: 'Team reports view',
      description:
        'Permite visualizar las comparativas de precios y reportes de gastos generados por las listas del equipo.',
    },
  ]
