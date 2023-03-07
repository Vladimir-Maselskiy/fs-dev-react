import { DataType } from '@/components/FSetsOrderTable/FSetsOrderTable';
import { jsPDF } from 'jspdf';

export const getPdfFile = (data: DataType[]) => {
  const doc = new jsPDF();
  doc.text('Hello World', 10, 10);
  doc.save('a4.pdf');
};
