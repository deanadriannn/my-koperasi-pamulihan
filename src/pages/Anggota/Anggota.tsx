import "./Anggota.css"
import Table from "../../components/Table/Table"
import { useEffect, useState } from "react";
import Database from "@tauri-apps/plugin-sql";
import { Link } from "react-router";
import Button from "../../components/Button/Button";

type Anggota = {
  id: number;
  no_anggota: string;
  nama_lengkap: string;
  alamat: string;
  no_telpon: string;
};

const Anggota = () => {
  const [anggota, setAnggota] = useState<Anggota[]>([]);

  async function getAnggota() {
    try {
      const db = await Database.load("sqlite:koperasi.db");
      const dbAnggota = await db.select<Anggota[]>("SELECT * FROM anggota");

      setAnggota(dbAnggota);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAnggota();
  }, []);

  return (
    <div>
      <Button className="anggota__tambah_button">
        <Link to="/anggota-input" className="anggota__tambah_link">Tambah Anggota</Link>
      </Button>
      <Table 
        columns={["No Anggota", "Nama Lengkap", "Alamat", "No Telepon"]}
      >
        {anggota.map((anggota) => (
          <tr key={anggota.id}>
            <td className="table__td">{anggota.no_anggota}</td>
            <td className="table__td">{anggota.nama_lengkap}</td>
            <td className="table__td">{anggota.alamat}</td>
            <td className="table__td">{anggota.no_telpon}</td>
          </tr>
        ))}
      </Table>
    </div>
  )
}

export default Anggota