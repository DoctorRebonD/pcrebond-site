CREATE TABLE IF NOT EXISTS testimonials (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 name TEXT NOT NULL,
 stars INTEGER NOT NULL CHECK(stars BETWEEN 1 AND 5),
 comment TEXT NOT NULL,
 status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','published')),
 created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
 updated_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_testimonials_status ON testimonials(status);

CREATE TABLE IF NOT EXISTS gallery (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 object_key TEXT NOT NULL UNIQUE,
 title TEXT,
 caption TEXT,
 sort_order INTEGER NOT NULL DEFAULT 0,
 published INTEGER NOT NULL DEFAULT 1 CHECK(published IN (0,1)),
 created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
 updated_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_gallery_order ON gallery(sort_order);
