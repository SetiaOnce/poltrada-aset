<?php

namespace App\Exports;

use App\Models\JenisAset;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithTitle;

class ExportJenisAset implements FromCollection ,WithHeadings, WithTitle
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return JenisAset::select('id','jenis_aset')->get();
    }

    public function title(): string
    {
        return 'Jenis Aset';
    }
    
    public function headings(): array
    {
        return ["ID", "JENIS ASET"];
    }

}
