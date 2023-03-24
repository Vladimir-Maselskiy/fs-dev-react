import { DataType } from '@/components/FSetsOrderTable/FSetsOrderTable';
import { jsPDF } from 'jspdf';
import { fontNormal } from '../../fonts/segoe-ui/font-normal';
import { fontBold } from '../../fonts/segoe-ui/font-bold';
// import { font } from './font';

export const getPdfFile = async (data: DataType[]) => {
  const doc = new jsPDF();
  doc.addFileToVFS('Segoe-UI-normal.ttf', fontNormal);
  doc.addFileToVFS('Segoe-UI-bold.ttf', fontBold);
  doc.addFont('Segoe-UI-normal.ttf', 'Segoe', 'normal');
  doc.addFont('Segoe-UI-bold.ttf', 'Segoe', 'bold');
  doc.setFont('Segoe', 'normal', 'bold');
  doc.setFontSize(8);

  let x = 10;
  let y = 10;
  const articleTab = Math.max(15, data[0].article.length * 2);
  doc.text('Прорахунок', x, y);
  y += 10;
  doc.text('| Артикул', x, y);
  x += articleTab;
  doc.text('|  Назва', x, y);
  x += 110;
  doc.text(`|  Кількість`, x, y);
  x += 15;
  doc.text('|  Ціна', x, y);
  x += 20;
  doc.text('|  Сума', x, y);
  x += 17;
  doc.text(`  |`, x, y);
  doc.line(10, y - 6, 190, y - 6);
  x = 10;
  y += 10;
  doc.setFont('Segoe', 'normal', 'normal');
  doc.setFontSize(10);
  data.forEach(({ article, name, price, quantity, sum }) => {
    doc.text(`| ${article}`, x, y);
    x += articleTab;
    doc.text(`|  ${name.slice(0, 55)}`, x, y);
    x += 110;
    doc.text(`|      ${quantity}`, x, y);
    x += 15;
    doc.text(`|  ${price}грн`, x, y);
    x += 20;
    doc.text(`|  ${sum}грн`, x, y);
    x += 17;
    doc.text(`  |`, x, y);

    doc.line(10, y - 6, 190, y - 6);
    y += 10;
    x = 10;
  });

  doc.setFont('Segoe', 'normal', 'bold');
  doc.setFontSize(12);
  x += 125;
  doc.text(`|  Всього`, x, y);
  x += 15;
  doc.text(
    `             ${data.reduce((acc, el) => acc + +el.sum, 0).toFixed(2)}грн`,
    x,
    y
  );
  x += 37;

  doc.text(`  |`, x, y);
  doc.line(10, y - 6, 190, y - 6);
  x = 10;
  y += 10;
  doc.save('order.pdf');
};
