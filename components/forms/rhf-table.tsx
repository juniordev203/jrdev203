'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { ColumnDef, RowSelectionState } from '@tanstack/react-table';
import { DataTable } from '../data-table';

interface RHFDataTableProps<TData extends { id: string }, TValue> {
  name: string;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  title?: string;
  helperText?: string;
}

export function RHFDataTable<TData extends { id: string }, TValue>({
  name,
  columns,
  data,
  title,
  helperText,
}: RHFDataTableProps<TData, TValue>) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={{}}
      render={({ field, fieldState: { error } }) => (
        <DataTable
          columns={columns}
          data={data}
          // Pass the selection state from the form field to the table.
          rowSelection={field.value as RowSelectionState}
          // Pass the form field's update function to the table.
          setRowSelection={field.onChange}
          title={title}
          helperText={error?.message ?? helperText}
        />
      )}
    />
  );
}
