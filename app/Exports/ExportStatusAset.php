<?php

namespace App\Exports;

use App\Models\StatusAset;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithTitle;

class ExportStatusAset implements FromCollection, WithHeadings, WithTitle
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return StatusAset::select('id','status_aset')->get();
    }

    public function title(): string
    {
        return 'Status Aset';
    }

    public function headings(): array
    {
        return ["ID", "STATUS ASET"];
    }
}
