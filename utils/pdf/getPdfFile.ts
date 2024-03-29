import { IItem } from '@/components/FSetsOrderTable/FSetsOrderTable';
import { jsPDF } from 'jspdf';
import { fontNormal } from '../../fonts/segoe-ui/font-normal';
import { fontBold } from '../../fonts/segoe-ui/font-bold';
import { getMaxCeilLength } from './getMaxCeilLength';

export const getPdfFile = async (data: IItem[]) => {
  const doc = new jsPDF();
  doc.addFileToVFS('Segoe-UI-normal.ttf', fontNormal);
  doc.addFileToVFS('Segoe-UI-bold.ttf', fontBold);
  doc.addFont('Segoe-UI-normal.ttf', 'Segoe', 'normal');
  doc.addFont('Segoe-UI-bold.ttf', 'Segoe', 'bold');
  doc.setFont('Segoe', 'normal', 'bold');
  doc.setFontSize(8);

  let x = 10;
  let y = 10;
  const article = 'article' as keyof IItem;
  const articleTab = getMaxCeilLength(data, article);
  doc.text('Прорахунок', x, y);
  y += 10;
  doc.text('|  №', x, y);
  x += 7;
  doc.text('| Артикул', x, y);
  x += articleTab;
  doc.text('|  Назва', x, y);
  x += 118 - articleTab;
  doc.text(`| Кількість`, x, y);
  x += 15;
  doc.text('|  Ціна', x, y);
  x += 20;
  doc.text('|  Сума', x, y);
  x += 17;
  doc.text(`  |`, x, y);
  doc.line(10, y - 6, 190, y - 6);
  x = 10;
  y += 8;
  doc.setFont('Segoe', 'normal', 'normal');
  doc.setFontSize(8);
  data.forEach(({ article, name, price, quantity, sum }, index) => {
    doc.text(`| ${index + 1}`, x, y);
    x += 7;
    doc.text(`| ${article}`, x, y);
    x += articleTab;
    doc.text(`|  ${name.slice(0, Math.ceil((120 - articleTab) / 1.6))}`, x, y);
    x += 118 - articleTab;
    doc.text(`|      ${quantity}`, x, y);
    x += 15;
    doc.text(`|  ${price}грн`, x, y);
    x += 20;
    doc.text(`|  ${sum}грн`, x, y);
    x += 17;
    doc.text(`  |`, x, y);

    doc.line(10, y - 4, 190, y - 4);
    y += 7;
    x = 10;
    if (y >= 290) {
      doc.addPage();
      y = 10;
    }
  });

  doc.setFont('Segoe', 'normal', 'bold');
  doc.setFontSize(12);
  y += 2;
  x += 124.6;
  doc.text(`|  Всього`, x, y);
  x += 15;
  doc.text(
    `             ${data.reduce((acc, el) => acc + +el.sum, 0).toFixed(2)}грн`,
    x,
    y
  );
  x += 36.4;

  doc.text(`  |`, x, y);
  doc.line(10, y - 6, 190, y - 6);
  doc.save('order.pdf');
};
