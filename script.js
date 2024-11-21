// Array para armazenar as informações dos alunos
const presencas = [];

document.getElementById('confirmar-presenca').addEventListener('click', function() {
    const ra = document.getElementById('ra').value;
    const codigo = document.getElementById('codigo').value;
    const email = document.getElementById('email').value;

    // Verifica se o campo de nome foi preenchido (obrigatório)
    if (codigo) {
        // Adiciona as informações ao array de presenças
        presencas.push({ ra, codigo, email });

        // Exibe uma mensagem de confirmação
        alert(`Presença confirmada para: ${codigo}`);

        // Limpa os campos de entrada
        document.getElementById('ra').value = '';
        document.getElementById('codigo').value = '';
        document.getElementById('email').value = '';
    } else {
        alert('Por favor, preencha o campo de nome.');
    }
});

document.getElementById('gerar-pdf').addEventListener('click', function() {
    const { jsPDF } = window.jspdf;

    const professor = document.getElementById('professor').value;
    const disciplina = document.getElementById('disciplina').value;

    // Cria um novo documento PDF em modo paisagem
    const doc = new jsPDF({ orientation: 'landscape' });

    // Título e informações do palestrante/tema
    doc.setFontSize(16);
    doc.text("Lista de Participantes", 148, 20, { align: 'center' }); // Centraliza no modo paisagem
    doc.setFontSize(12);
    doc.text(`Palestrante(s): ${professor}`, 20, 30);
    doc.text(`Tema(s): ${disciplina}`, 20, 40);
    doc.text(`Data: ${new Date().toLocaleDateString('pt-BR')}`, 20, 50);

    // Desenha a linha horizontal ajustada para o modo paisagem
    doc.line(20, 55, 290, 55); // Alinha com o modo paisagem

    // Verifica se há presenças
    if (presencas.length === 0) {
        doc.text("Nenhuma presença confirmada.", 20, 65);
    } else {
        // Cabeçalhos da tabela
        doc.setFontSize(9); // Tamanho da fonte ajustado para melhor visibilidade
        doc.text("Nº", 20, 65);
        doc.text("Matrícula", 40, 65);
        doc.text("Nome", 100, 65); // Ajuste de posição no modo paisagem
        doc.text("Email", 205, 65); // Ajuste de posição no modo paisagem

        // Adiciona a lista de presenças
        let yPosition = 75;
        presencas.forEach((presenca, index) => {
            doc.text(`${index + 1}`, 20, yPosition);
            doc.text(presenca.ra || "-", 40, yPosition); // Exibe "-" se a matrícula estiver vazia
            doc.text(presenca.codigo, 100, yPosition); // Ajuste de posição no modo paisagem

            // Exibe o email se disponível
            if (presenca.email) {
                doc.text(presenca.email, 205, yPosition); // Ajuste de posição no modo paisagem
            } else {
                doc.text("-", 205, yPosition); // Exibe "-" se não houver email
            }

            yPosition += 10;

            // Verifica se precisa criar uma nova página
            if (yPosition > 190) { // Limite ajustado para o modo paisagem
                doc.addPage();
                yPosition = 20;
            }
        });
    }

    // Salva o PDF
    doc.save('dad_lista.pdf');
});

function updateDateTime() {
    const now = new Date();
    const formattedDate = now.toLocaleDateString('pt-BR');
    const formattedTime = now.toLocaleTimeString('pt-BR');
    document.getElementById('datetime').innerText = `${formattedDate} ${formattedTime}`;
}

setInterval(updateDateTime, 1000);
