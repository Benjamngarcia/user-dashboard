export const downloadCSV = (data: Users) => {
  const headers = "Full Name,Email,Gender,Nationality,Age\n";
  const rows = data.map(user =>
    `${user.name.first} ${user.name.last},${user.email},${user.gender},${user.nat},${user.dob.age}`
  ).join("\n");

  const csvContent = `data:text/csv;charset=utf-8,${headers}${rows}`;
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "users.csv");
  link.click();
};