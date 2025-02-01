use tauri_plugin_sql::{Migration, MigrationKind};

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You’ve been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    // Definisikan migration
    let migrations = vec![
        Migration {
            version: 1,
            description: "create table anggota",
            sql: r#"
            CREATE TABLE IF NOT EXISTS anggota (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                no_anggota TEXT NOT NULL,
                nama_lengkap TEXT NOT NULL,
                alamat TEXT NOT NULL,
                no_telpon TEXT NOT NULL
            );
            "#,
            kind: MigrationKind::Up,
        },
        Migration {
            version: 2,
            description: "create table simpanan",
            sql: r#"
            CREATE TABLE IF NOT EXISTS simpanan (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                wajib INTEGER NOT NULL,
                pokok INTEGER NOT NULL,
                sukarela INTEGER NOT NULL,
                hari_raya INTEGER NOT NULL,
                ponsos INTEGER NOT NULL,
                bulan INTEGER NOT NULL,
                tahun INTEGER NOT NULL,
                anggota_id INTEGER NOT NULL,
                FOREIGN KEY (anggota_id) REFERENCES anggota(id)
            );
            "#,
            kind: MigrationKind::Up,
        },
    ];

    tauri::Builder::default()
        .plugin(
            tauri_plugin_sql::Builder::default()
                // Ganti test.db menjadi koperasi.db
                .add_migrations("sqlite:koperasi.db", migrations)
                .build()
        )
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running Tauri application");
}
