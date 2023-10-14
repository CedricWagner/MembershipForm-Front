/**
 * @desc make csv from given data
 * @param rows
 * @param filename
 * @param displayKeys
 *  wether to dispay the array keys as header
 */
export const makeCsv = async (
  rows: any[],
  filename: string,
  displayKeys: boolean = false
) => {
  const separator: string = ";";
  const keys: string[] = Object.keys(rows[0]);

  const csvContent = `${displayKeys ? keys.join(separator) + "\n" : ""}${rows
    .map((row) =>
      keys
        .map((k) => {
          let cell = row[k] === null || row[k] === undefined ? "" : row[k];

          cell =
            cell instanceof Date
              ? cell.toLocaleString()
              : cell.toString().replace(/"/g, '""');

          if (cell.search(/("|,|\n)/g) >= 0) {
            cell = `"${cell}"`;
          }
          return cell;
        })
        .join(separator)
    )
    .join("\n")}`;

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

  const link = document.createElement("a");
  if (link.download !== undefined) {
    // Browsers that support HTML5 download attribute
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
