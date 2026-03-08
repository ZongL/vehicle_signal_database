'use client';

import { useEffect, useRef, useState } from 'react';
import { ECU } from '@/app/lib/definitions';
import { deleteECU } from '@/app/lib/actions';

const columns = [
  { data: 'name', title: 'Name' },
  { data: 'description', title: 'Description' },
  { data: 'message_count', title: 'Message Count' },
  { data: 'id', title: 'Actions', orderable: false, searchable: false },
];

export default function ECUsDataTable({ ecus }: { ecus: ECU[] }) {
  const tableRef = useRef<HTMLTableElement>(null);
  const dtRef = useRef<any>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let dt: any;
    let aborted = false;

    const init = async () => {
      const $ = (await import('jquery')).default;
      await import('datatables.net-dt');
      // @ts-ignore
      await import('datatables.net-dt/css/dataTables.dataTables.min.css');

      if (aborted || !tableRef.current) return;

      if (($.fn as any).DataTable.isDataTable(tableRef.current)) {
        ($ as any)(tableRef.current).DataTable().destroy();
      }

      dt = ($ as any)(tableRef.current).DataTable({
        data: ecus,
        columns,
        pageLength: 20,
        lengthMenu: [10, 20, 50, 100],
        scrollX: true,
        autoWidth: true,
        order: [[0, 'asc']],
        columnDefs: [
          {
            targets: -1,
            render: function (data: string) {
              return `
                <div style="display:flex;gap:4px;justify-content:center;">
                  <button class="dt-delete-btn" data-id="${data}" title="Delete" style="padding:2px 6px;border:1px solid #d1d5db;border-radius:4px;display:inline-flex;align-items:center;cursor:pointer;background:none;">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:16px;height:16px;">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                  </button>
                </div>
              `;
            },
          },
          {
            targets: '_all',
            className: 'dt-head-center',
          },
        ],
      });

      dtRef.current = dt;
      setReady(true);
    };

    init();

    return () => {
      aborted = true;
      if (dt) {
        dt.destroy();
      }
    };
  }, [ecus]);

  useEffect(() => {
    const handleDelete = async (e: MouseEvent) => {
      const btn = (e.target as HTMLElement).closest('.dt-delete-btn');
      if (!btn) return;
      const id = btn.getAttribute('data-id');
      if (id && confirm('Are you sure you want to delete this ECU?')) {
        await deleteECU(id);
      }
    };

    document.addEventListener('click', handleDelete);
    return () => document.removeEventListener('click', handleDelete);
  }, []);

  return (
    <div className="mt-6">
      <table
        ref={tableRef}
        className="display compact stripe hover cell-border"
        style={{ width: '100%' }}
      />
    </div>
  );
}
