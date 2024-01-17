<?php

namespace App\Imports;

use App\Models\DataAset;
use Carbon\Carbon;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithChunkReading;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;

class ImportDataAset implements ToModel, WithHeadingRow, WithChunkReading, WithValidation
{
    public function rules(): array
	{
		return [  
            'fid_jenis' => 'required',
            'kode' => 'required',
            'nama' => 'required',
            'fid_unit_kerja' => 'required',
            'no_registrasi' => 'required',
            'volume' => 'required',
            'jumlah' => 'required',
            'fid_satuan' => 'required',
            'type' => 'required',
            'lokasi' => 'required',
            'tahun_pengadaan' => 'required',
            'harga_pengadaan' => 'required',
            'harga_sekarang' => 'required',
            'spesifikasi' => 'required',
            'fid_status' => 'required',
            'koor_lat' => 'required',
            'koor_lng' => 'required',
		];
	}

	public function customValidationMessages()
	{
		return [
            'fid_jenis.required' => 'Jenis aset masih kosong.',
            'kode.required' => 'Kode aset masih kosong.',
            'nama.required' => 'Nama aset masih kosong.',
            'fid_unit_kerja.required' => 'Unit kerja masih kosong.',
            'no_registrasi.required' => 'No regestrasi masih kosong.',
            'volume.required' => 'Volume masih kosong.',
            'jumlah.required' => 'Jumlah masih kosong.',
            'fid_satuan.required' => 'Satuan aset masih kosong.',
            'type.required' => 'Tipe aset masih kosong.',
            'lokasi.required' => 'Lokasi aset masih kosong.',
            'tahun_pengadaan.required' => 'Tahun pengadaan aset masih kosong.',
            'harga_pengadaan.required' => 'Harga pengadaan aset masih kosong.',
            'harga_sekarang.required' => 'Harga sekarang masih kosong.',
            'spesifikasi_aset.required' => 'Spesifikasi aset masih kosong.',
            'fid_status.required' => 'Status aset masih kosong.',
            'koor_lat.required' => 'Koordinat latitude masih kosong.',
            'koor_lng.required' => 'Koordinat longtitude masih kosong.',
		];
	}

    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null 
    */
    public function model(array $row)
    {  
        date_default_timezone_set("Asia/Makassar");
		
        return DataAset::updateOrCreate([
            'kode'   => $row['kode'],
            'no_registrasi'   => $row['no_registrasi'],
            ],[        
                'fid_jenis' => $row['fid_jenis'],   
                'fid_status' => $row['fid_status'],   
                'fid_unit_kerja' => $row['fid_unit_kerja'],   
                'kode' => $row['kode'],   
                'nama' => $row['nama'],   
                'type' => $row['type'],   
                'tahun_pengadaan' => $row['tahun_pengadaan'],   
                'volume' => $row['volume'],   
                'no_registrasi' => $row['no_registrasi'],   
                'spesifikasi' => $row['spesifikasi'],   
                'harga_pengadaan' => $row['harga_pengadaan'],   
                'harga_sekarang' => $row['harga_sekarang'],   
                'lokasi' => $row['lokasi'],   
                'koor_lat' => $row['koor_lat'],   
                'koor_lng' => $row['koor_lng'],   
                'jumlah' => $row['jumlah'],   
                'fid_satuan' => $row['fid_satuan'],   
                'user_add' => session()->get('nama'),   
                'created_at' => Carbon::now(),   
            ]
        );  
    }

    public function chunkSize(): int
    {
        return 1000;
    }
    
}
