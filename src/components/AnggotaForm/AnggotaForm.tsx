import Input from "../../components/Input/Input"
import { useForm, SubmitHandler } from "react-hook-form"
import Button from "../../components/Button/Button"
import "./AnggotaForm.css"
import Database from "@tauri-apps/plugin-sql";
import { useState } from "react";
import { useNavigate } from "react-router";

type Inputs = {
  no_anggota: string
  nama_lengkap: string
  alamat: string
  no_telpon: string
}

const AnggotaForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setIsLoading(true)
      const db = await Database.load("sqlite:koperasi.db");

      await db.execute("INSERT INTO anggota (no_anggota, nama_lengkap, alamat, no_telpon) VALUES ($1, $2, $3, $4)", [
        data.no_anggota,
        data.nama_lengkap,
        data.alamat,
        data.no_telpon
      ]);
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoading(false)
      navigate("/anggota");
    }
  }

  return (
    <form className="anggota_form__form_wrapper" onSubmit={handleSubmit(onSubmit)}>
      <div className="anggota_form__input_wrapper">
        <Input 
          label="No Anggota"
          {...register("no_anggota", { required: true })}
          disabled={isLoading}
        />
        {errors.no_anggota && <span className="error_message">No Anggota wajib diisi</span>}
      </div>
      <div className="anggota_form__input_wrapper">
        <Input 
          label="Nama Lengkap"
          {...register("nama_lengkap", { required: true })}
          disabled={isLoading}
        />
        {errors.no_anggota && <span>Nama Lengkap wajib diisi</span>}
      </div>
      <div className="anggota_form__input_wrapper">
        <Input 
          label="Alamat"
          {...register("alamat", { required: true })}
          disabled={isLoading}
        />
        {errors.no_anggota && <span>Alamat wajib diisi</span>}
      </div>
      <div className="anggota_form__input_wrapper">
        <Input 
          label="No Telepon"
          {...register("no_telpon", { required: true })}
          disabled={isLoading}
        />
        {errors.no_anggota && <span>No Telepon wajib diisi</span>}
      </div>
      <Button type="submit" disabled={isLoading}>
        Tambah Anggota
      </Button>
    </form>
  )
}

export default AnggotaForm