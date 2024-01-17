<?php

namespace App\Exports;

use App\Models\UnitKerja;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithTitle;

class ExportUnitKerja implements FromCollection ,WithHeadings, WithTitle
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return UnitKerja::select('id','unit_kerja')->get();
    }

    public function title(): string
    {
        return 'Unit Kerja';
    }
    
    public function headings(): array
    {
        return ["ID", "UNIT KERJA"];
    }

}
