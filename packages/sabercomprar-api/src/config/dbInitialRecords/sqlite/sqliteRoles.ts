import { v7 as UUIDv7 } from 'uuid'
import type { rolesTableSqlite } from '../../../db/sqliteSchema.js'

export const sqliteRoles: (typeof rolesTableSqlite.$inferInsert)[] = [
  {
    id: UUIDv7(),
    slug: 'super-admin',
    name: 'Super admin',
    description:
      'Acceso total al sistema, gestión de configuraciones globales, auditoría y control de todos los roles y permisos.',
  },
  {
    id: UUIDv7(),
    slug: 'catalog-moderator',
    name: 'Catalog moderator',
    description:
      'Encargado de estandarizar productos, marcas y supermercados. Asegura que no haya duplicados y que la información de precios sea coherente.',
  },
  {
    id: UUIDv7(),
    slug: 'technical-support',
    name: 'Technical support',
    description:
      'Acceso limitado para visualizar perfiles de usuario y equipos con el fin de resolver incidencias reportadas por los clientes.',
  },
  {
    id: UUIDv7(),
    slug: 'premium-user',
    name: 'Premium user',
    description:
      'Usuario con acceso a todas las funcionalidades estándar, además de reportes avanzados, comparativas históricas ilimitadas y mayor capacidad de creación de equipos.',
  },
  {
    id: UUIDv7(),
    slug: 'standard-user',
    name: 'Standard user',
    description:
      'Rol básico por defecto. Permite crear equipos, listas de compras y participar en tableros con límites definidos por la plataforma.',
  },
  {
    id: UUIDv7(),
    slug: 'guest-user',
    name: 'Guest user',
    description:
      'Rol con acceso restringido, generalmente para usuarios que solo visualizan listas compartidas públicamente o que están en periodo de prueba.',
  },
]
