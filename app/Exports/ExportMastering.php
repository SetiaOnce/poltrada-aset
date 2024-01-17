<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class ExportMastering implements WithMultipleSheets
{
    public function sheets(): array
    {
        return [
            'Jenis Aset' => new ExportJenisAset,
            'Satuan Aset' => new ExportSatuanAset(),
            'Satatus Aset' => new ExportStatusAset(),
            'Unit Kerja' => new ExportUnitKerja(),
        ];
    }
}
