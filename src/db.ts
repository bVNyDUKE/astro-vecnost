import type { InferModel } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import {
  pgTable,
  smallint,
  varchar,
  bigint,
  text,
  json,
} from "drizzle-orm/pg-core";

export const region = pgTable("region", {
  id: smallint("id").notNull(),
  name: varchar("name").notNull(),
});

export const persons = pgTable("persons", {
  id: bigint("id", { mode: "number" }).notNull(),
  pol: text("pol"),
  ime: text("ime"),
  prezime: text("prezime"),
  rodjenoPrezime: text("rodjeno_prezime"),
  srednjeSlovo: text("srednje_slovo"),
  nadimak: text("nadimak"),
  titula: text("titula"),
  rodjenje: text("rodjenje"),
  smrt: text("smrt"),
  tipSlike: text("tip_slike"),
  pismo: text("pismo"),
  simboli: text("simboli"),
  oznake: text("oznake"),
  groblje: bigint("groblje", { mode: "number" }).references(() => groblje.id),
});

export const groblje = pgTable("groblje", {
  id: bigint("id", { mode: "number" }).notNull(),
  name: text("name").notNull(),
  opstinaId: bigint("opstina_id", { mode: "number" }).references(
    () => opstina.id
  ),
  position: json("position"),
});

export const opstina = pgTable("opstina", {
  id: bigint("id", { mode: "number" }).notNull(),
  name: text("name").notNull(),
  okrugId: smallint("okrug_id").references(() => okrug.id),
});

export const okrug = pgTable("okrug", {
  id: smallint("id").notNull(),
  name: varchar("name").notNull(),
  regionId: smallint("region_id")
    .notNull()
    .references(() => region.id),
});

export type Person = InferModel<typeof persons>;
export type Groblje = InferModel<typeof groblje>;
export type Opstina = InferModel<typeof opstina>;
export type Okrug = InferModel<typeof okrug>;
export type Region = InferModel<typeof region>;

const pool = new Pool({
  connectionString: import.meta.env.DB_URL,
});

const db = drizzle(pool);

export default db;
