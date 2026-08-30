CREATE TABLE IF NOT EXISTS reviews (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 name TEXT NOT NULL,
 stars INTEGER NOT NULL CHECK(stars BETWEEN 1 AND 5),
 comment TEXT NOT NULL,
 status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','published')),
 created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_reviews_status_created ON reviews(status,created_at);
CREATE TABLE IF NOT EXISTS gallery (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 object_key TEXT NOT NULL UNIQUE,
 title TEXT,
 caption TEXT,
 created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_gallery_created ON gallery(created_at);
