import {
  integer,
  primaryKey,
  real,
  sqliteTable,
  text,
} from 'drizzle-orm/sqlite-core'
import { Temporal } from 'temporal-polyfill'

export const permissionsTableSqlite = sqliteTable('permissions', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  state: text('state', { enum: ['active', 'archived'] })
    .notNull()
    .default('active'),
  createdAt: text('created_at')
    .notNull()
    .default(Temporal.Now.plainDateTimeISO(Temporal.Now.timeZoneId()).toJSON()),
  updatedAt: text('updated_at')
    .notNull()
    .default(Temporal.Now.plainDateTimeISO(Temporal.Now.timeZoneId()).toJSON()),
  archivedAt: text('archived_at')
    .$type<string | null>()
    .$onUpdate(() => null),
})

export const rolesTableSqlite = sqliteTable('roles', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  state: text('state', { enum: ['active', 'archived'] })
    .notNull()
    .default('active'),
  createdAt: text('created_at')
    .notNull()
    .default(Temporal.Now.plainDateTimeISO(Temporal.Now.timeZoneId()).toJSON()),
  updatedAt: text('updated_at')
    .notNull()
    .default(Temporal.Now.plainDateTimeISO(Temporal.Now.timeZoneId()).toJSON()),
  archivedAt: text('archived_at')
    .$type<string | null>()
    .$onUpdate(() => null),
})

export const rolePermissionsTableSqlite = sqliteTable(
  'role_permissions',
  {
    roleId: text('role_id')
      .notNull()
      .references(() => rolesTableSqlite.id),
    permissionId: text('permission_id')
      .notNull()
      .references(() => permissionsTableSqlite.id),
  },
  (table) => [primaryKey({ columns: [table.roleId, table.permissionId] })]
)

export const usersTableSqlite = sqliteTable('users', {
  id: text('id').primaryKey(),
  handle: text('handle').notNull().unique(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  avatar: text('avatar')
    .$type<string | null>()
    .$onUpdate(() => null),
  roleId: text('role_id')
    .notNull()
    .references(() => rolesTableSqlite.id),
  state: text('state', { enum: ['active', 'archived'] })
    .notNull()
    .default('active'),
  createdAt: text('created_at')
    .notNull()
    .default(Temporal.Now.plainDateTimeISO(Temporal.Now.timeZoneId()).toJSON()),
  updatedAt: text('updated_at')
    .notNull()
    .default(Temporal.Now.plainDateTimeISO(Temporal.Now.timeZoneId()).toJSON()),
  archivedAt: text('archived_at')
    .$type<string | null>()
    .$onUpdate(() => null),
})

export const teamPermissionsTableSqlite = sqliteTable('team_permissions', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  state: text('state', { enum: ['active', 'archived'] })
    .notNull()
    .default('active'),
  createdAt: text('created_at')
    .notNull()
    .default(Temporal.Now.plainDateTimeISO(Temporal.Now.timeZoneId()).toJSON()),
  updatedAt: text('updated_at')
    .notNull()
    .default(Temporal.Now.plainDateTimeISO(Temporal.Now.timeZoneId()).toJSON()),
  archivedAt: text('archived_at')
    .$type<string | null>()
    .$onUpdate(() => null),
})

export const teamRolesTableSqlite = sqliteTable('team_roles', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  state: text('state', { enum: ['active', 'archived'] })
    .notNull()
    .default('active'),
  createdAt: text('created_at')
    .notNull()
    .default(Temporal.Now.plainDateTimeISO(Temporal.Now.timeZoneId()).toJSON()),
  updatedAt: text('updated_at')
    .notNull()
    .default(Temporal.Now.plainDateTimeISO(Temporal.Now.timeZoneId()).toJSON()),
  archivedAt: text('archived_at')
    .$type<string | null>()
    .$onUpdate(() => null),
})

export const teamRoleTeamPermissionsTableSqlite = sqliteTable(
  'team_role_team_permissions',
  {
    teamRoleId: text('team_role_id')
      .notNull()
      .references(() => teamRolesTableSqlite.id),
    teamPermissionId: text('team_permission_id')
      .notNull()
      .references(() => teamPermissionsTableSqlite.id),
  },
  (table) => [
    primaryKey({ columns: [table.teamRoleId, table.teamPermissionId] }),
  ]
)

export const brandsTableSqlite = sqliteTable('brands', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  state: text('state', { enum: ['active', 'archived'] })
    .notNull()
    .default('active'),
  createdAt: text('created_at')
    .notNull()
    .default(Temporal.Now.plainDateTimeISO(Temporal.Now.timeZoneId()).toJSON()),
  updatedAt: text('updated_at')
    .notNull()
    .default(Temporal.Now.plainDateTimeISO(Temporal.Now.timeZoneId()).toJSON()),
  archivedAt: text('archived_at')
    .$type<string | null>()
    .$onUpdate(() => null),
})

export const presentationsTableSqlite = sqliteTable('presentations', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  state: text('state', { enum: ['active', 'archived'] })
    .notNull()
    .default('active'),
  createdAt: text('created_at')
    .notNull()
    .default(Temporal.Now.plainDateTimeISO(Temporal.Now.timeZoneId()).toJSON()),
  updatedAt: text('updated_at')
    .notNull()
    .default(Temporal.Now.plainDateTimeISO(Temporal.Now.timeZoneId()).toJSON()),
  archivedAt: text('archived_at')
    .$type<string | null>()
    .$onUpdate(() => null),
})

export const productsTableSqlite = sqliteTable('products', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  brandId: text('brand_id')
    .notNull()
    .references(() => brandsTableSqlite.id),
  presentationId: text('presentation_id')
    .notNull()
    .references(() => presentationsTableSqlite.id),
  state: text('state', { enum: ['active', 'archived'] })
    .notNull()
    .default('active'),
  createdAt: text('created_at')
    .notNull()
    .default(Temporal.Now.plainDateTimeISO(Temporal.Now.timeZoneId()).toJSON()),
  updatedAt: text('updated_at')
    .notNull()
    .default(Temporal.Now.plainDateTimeISO(Temporal.Now.timeZoneId()).toJSON()),
  archivedAt: text('archived_at')
    .$type<string | null>()
    .$onUpdate(() => null),
})

export const supermarketsTableSqlite = sqliteTable('supermarkets', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  state: text('state', { enum: ['active', 'archived'] })
    .notNull()
    .default('active'),
  createdAt: text('created_at')
    .notNull()
    .default(Temporal.Now.plainDateTimeISO(Temporal.Now.timeZoneId()).toJSON()),
  updatedAt: text('updated_at')
    .notNull()
    .default(Temporal.Now.plainDateTimeISO(Temporal.Now.timeZoneId()).toJSON()),
  archivedAt: text('archived_at')
    .$type<string | null>()
    .$onUpdate(() => null),
})

export const shoppingListsTableSqlite = sqliteTable('shopping_lists', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  supermarketId: text('supermarket_id')
    .notNull()
    .references(() => supermarketsTableSqlite.id),
  description: text('description').notNull(),
  total: real('total').notNull().default(0.0),
  shoppedAt: text('shopped_at')
    .notNull()
    .default(Temporal.Now.plainDateTimeISO(Temporal.Now.timeZoneId()).toJSON()),
  state: text('state', { enum: ['active', 'archived'] })
    .notNull()
    .default('active'),
  createdAt: text('created_at')
    .notNull()
    .default(Temporal.Now.plainDateTimeISO(Temporal.Now.timeZoneId()).toJSON()),
  updatedAt: text('updated_at')
    .notNull()
    .default(Temporal.Now.plainDateTimeISO(Temporal.Now.timeZoneId()).toJSON()),
  archivedAt: text('archived_at')
    .$type<string | null>()
    .$onUpdate(() => null),
})

export const shoppingListProductsTableSqlite = sqliteTable(
  'shopping_list_products',
  {
    shoppingListId: text('shopping_list_id')
      .notNull()
      .references(() => shoppingListsTableSqlite.id),
    productId: text('product_id')
      .notNull()
      .references(() => productsTableSqlite.id),
    price: real('price').notNull().default(0.0),
    amount: integer('amount', { mode: 'number' }).notNull().default(1),
    subtotal: real('subtotal').notNull().default(0.0),
    state: text('state', { enum: ['active', 'archived'] })
      .notNull()
      .default('active'),
    createdAt: text('created_at')
      .notNull()
      .default(
        Temporal.Now.plainDateTimeISO(Temporal.Now.timeZoneId()).toJSON()
      ),
    updatedAt: text('updated_at')
      .notNull()
      .default(
        Temporal.Now.plainDateTimeISO(Temporal.Now.timeZoneId()).toJSON()
      ),
    archivedAt: text('archived_at')
      .$type<string | null>()
      .$onUpdate(() => null),
  },
  (table) => [primaryKey({ columns: [table.shoppingListId, table.productId] })]
)

export const teamsTableSqlite = sqliteTable('teams', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  state: text('state', { enum: ['active', 'archived'] })
    .notNull()
    .default('active'),
  createdAt: text('created_at')
    .notNull()
    .default(Temporal.Now.plainDateTimeISO(Temporal.Now.timeZoneId()).toJSON()),
  updatedAt: text('updated_at')
    .notNull()
    .default(Temporal.Now.plainDateTimeISO(Temporal.Now.timeZoneId()).toJSON()),
  archivedAt: text('archived_at')
    .$type<string | null>()
    .$onUpdate(() => null),
})

export const boardsTableSqlite = sqliteTable('boards', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  teamId: text('team_id')
    .notNull()
    .references(() => teamsTableSqlite.id),
  state: text('state', { enum: ['active', 'archived'] })
    .notNull()
    .default('active'),
  createdAt: text('created_at')
    .notNull()
    .default(Temporal.Now.plainDateTimeISO(Temporal.Now.timeZoneId()).toJSON()),
  updatedAt: text('updated_at')
    .notNull()
    .default(Temporal.Now.plainDateTimeISO(Temporal.Now.timeZoneId()).toJSON()),
  archivedAt: text('archived_at')
    .$type<string | null>()
    .$onUpdate(() => null),
})

export const boardShoppingLists = sqliteTable(
  'board_shopping_lists',
  {
    boardId: text('board_id')
      .notNull()
      .references(() => boardsTableSqlite.id),
    shoppingList: text('shopping_list_id')
      .notNull()
      .references(() => shoppingListsTableSqlite.id),
  },
  (table) => [primaryKey({ columns: [table.boardId, table.shoppingList] })]
)

export const userTeamsRolesTableSqlite = sqliteTable(
  'user_teams_roles',
  {
    userId: text('user_id')
      .notNull()
      .references(() => usersTableSqlite.id),
    teamId: text('team_id')
      .notNull()
      .references(() => teamsTableSqlite.id),
    teamRoleId: text('team_role_id')
      .notNull()
      .references(() => teamRolesTableSqlite.id),
    state: text('state', { enum: ['active', 'archived'] })
      .notNull()
      .default('active'),
    createdAt: text('created_at')
      .notNull()
      .default(
        Temporal.Now.plainDateTimeISO(Temporal.Now.timeZoneId()).toJSON()
      ),
    updatedAt: text('updated_at')
      .notNull()
      .default(
        Temporal.Now.plainDateTimeISO(Temporal.Now.timeZoneId()).toJSON()
      ),
    archivedAt: text('archived_at')
      .$type<string | null>()
      .$onUpdate(() => null),
  },
  (table) => [
    primaryKey({ columns: [table.userId, table.teamId, table.teamRoleId] }),
  ]
)
