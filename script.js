// تسجيل الدخول
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    const correctUsername = "Aldalyalhwd@gmail.com";
    const correctPassword = "Ibrachim";
    
    if (username === correctUsername && password === correctPassword) {
        document.getElementById("login-screen").style.display = "none";
        document.getElementById("main-screen").style.display = "block";
    } else {
        document.getElementById("login-error").innerText = "اسم المستخدم أو كلمة المرور غير صحيحة.";
    }
}

// حفظ الأصناف
function saveItem() {
    const itemType = document.getElementById("itemType").value;
    if (!itemType) {
        alert("الرجاء إدخال اسم النوع.");
        return;
    }

    const items = JSON.parse(localStorage.getItem("items")) || [];
    items.push({ itemType });
    localStorage.setItem("items", JSON.stringify(items));
    loadItems();
}

// تحميل الأصناف من التخزين المحلي
function loadItems() {
    const items = JSON.parse(localStorage.getItem("items")) || [];
    const table = document.getElementById("itemsTable").getElementsByTagName('tbody')[0];
    table.innerHTML = "";
    
    items.forEach((item, index) => {
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${item.itemType}</td>
                <td><button onclick="deleteItem(${index})">حذف</button></td>
            </tr>`;
        table.innerHTML += row;
    });
}

// حذف صنف
function deleteItem(index) {
    const items = JSON.parse(localStorage.getItem("items")) || [];
    items.splice(index, 1);
    localStorage.setItem("items", JSON.stringify(items));
    loadItems();
}

// حفظ الفواتير
function saveInvoice() {
    const item = document.getElementById("invoiceItem").value;
    const quantity = parseFloat(document.getElementById("invoiceQuantity").value);
    const price = parseFloat(document.getElementById("invoicePrice").value);
    const totalField = document.getElementById("invoiceTotal");

    if (!item || isNaN(quantity) || isNaN(price)) {
        alert("الرجاء إدخال جميع البيانات.");
        return;
    }

    const total = quantity * price;
    totalField.value = total.toFixed(2);

    const invoices = JSON.parse(localStorage.getItem("invoices")) || [];
    invoices.push({
        item,
        quantity,
        price,
        total: total.toFixed(2)
    });

    localStorage.setItem("invoices", JSON.stringify(invoices));
    loadInvoices();
}

// تحميل الفواتير من التخزين المحلي
function loadInvoices() {
    const invoices = JSON.parse(localStorage.getItem("invoices")) || [];
    const table = document.getElementById("invoiceList").getElementsByTagName('tbody')[0];
    table.innerHTML = "";
    
    invoices.forEach((invoice, index) => {
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${invoice.item}</td>
                <td>${invoice.quantity}</td>
                <td>${invoice.price}</td>
                <td>${invoice.total}</td>
                <td><button onclick="deleteInvoice(${index})">حذف</button></td>
            </tr>`;
        table.innerHTML += row;
    });
}

// حذف فاتورة
function deleteInvoice(index) {
    const invoices = JSON.parse(localStorage.getItem("invoices")) || [];
    invoices.splice(index, 1);
    localStorage.setItem("invoices", JSON.stringify(invoices));
    loadInvoices();
}

// طباعة البيانات
function printData() {
    const printContent = document.getElementById("main-screen").innerHTML;
    const win = window.open('', '', 'height=700, width=900');
    win.document.write('<html><head><title>طباعة الفواتير والأصناف</title>');
    win.document.write('<style>table { width: 100%; border-collapse: collapse; } th, td { padding: 10px; border: 1px solid #ddd; text-align: center; } th { background-color: #4CAF50; color: white; }</style>');
    win.document.write('</head><body>');
    win.document.write(printContent);
    win.document.write('<footer style="text-align: center;">');
    win.document.write('<p>التاريخ والوقت: ' + new Date().toLocaleString() + '</p>');
    win.document.write('<p>م/ إبراهيم عبدالله أحمد علي السنمي</p>');
    win.document.write('<p>الرقم: 778091233</p>');
    win.document.write('</footer>');
    win.document.write('</body></html>');
    win.document.close();
    win.print();
}