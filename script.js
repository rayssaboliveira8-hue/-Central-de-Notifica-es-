document.addEventListener('DOMContentLoaded', () => {
  // 1. Mapeamento de elementos do Toast Único
  const toastEl = document.getElementById('singleToast');
  const toastHeader = document.getElementById('toastHeader');
  const toastIcon = document.getElementById('toastIcon');
  const toastTitle = document.getElementById('toastTitle');
  const toastBody = document.getElementById('toastBody');
  const toastTime = document.getElementById('toastTime');

  // Instância do Toast Bootstrap (5000ms = 5 segundos, autohide habilitado)
  const bsToast = new bootstrap.Toast(toastEl, {
    autohide: true,
    delay: 5000
  });

  // 2. Mapeamento do Histórico, Contador e Modal de Confirmação
  const historyList = document.getElementById('historyList');
  const actionCounterEl = document.getElementById('actionCounter');
  let totalActions = 0;

  const confirmModalEl = document.getElementById('confirmClearModal');
  const bsConfirmModal = bootstrap.Modal.getOrCreateInstance(confirmModalEl);

  // 3. Função Reutilizável para Acionamento do Toast
  function triggerNotification(config) {
    // Altera dynamicamente as cores do cabeçalho do Toast
    toastHeader.className = `toast-header text-white ${config.headerBgClass}`;

    // Altera os conteúdos visuais do Toast
    toastIcon.className = `me-2 fs-5 ${config.iconClass}`;
    toastTitle.textContent = config.title;
    toastBody.textContent = config.message;

    // Atualiza o horário atual
    const now = new Date();
    toastTime.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    // Exibe a notificação sem recarregar a página
    bsToast.show();

    // Adiciona o registro no histórico de atividades
    addHistoryRecord(config.historyText);
  }

  // 4. Função para Atualização Dinâmica do Histórico via DOM
  function addHistoryRecord(text) {
    // Remove mensagem inicial de lista vazia
    const emptyMsg = document.getElementById('emptyHistoryMsg');
    if (emptyMsg) {
      emptyMsg.remove();
    }

    // Incrementa contador numérico
    totalActions++;
    actionCounterEl.textContent = totalActions;

    // Cria novo item <li> com createElement e innerHTML
    const timeString = new Date().toLocaleTimeString();
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.innerHTML = `
      <span><i class="bi bi-caret-right-fill text-primary me-2"></i>${text}</span>
      <span class="badge bg-light text-dark border">${timeString}</span>
    `;

    // Insere o registro no topo da lista
    historyList.insertBefore(li, historyList.firstChild);
  }

  // 5. Escutadores de Eventos dos Botões (Etapa 3)
  document.getElementById('btnRegister').addEventListener('click', () => {
    triggerNotification({
      title: 'Cadastro realizado',
      message: 'O usuário foi cadastrado com sucesso.',
      headerBgClass: 'bg-success',
      iconClass: 'bi-person-check-fill',
      historyText: 'Cadastro realizado com sucesso.'
    });
  });

  document.getElementById('btnSecurity').addEventListener('click', () => {
    triggerNotification({
      title: 'Atenção à segurança',
      message: 'Verifique suas credenciais de acesso.',
      headerBgClass: 'bg-warning text-dark',
      iconClass: 'bi-shield-exclamation',
      historyText: 'Verificação de segurança executada.'
    });
  });

  document.getElementById('btnSystem').addEventListener('click', () => {
    triggerNotification({
      title: 'Sistema atualizado',
      message: 'Nenhuma atualização pendente foi encontrada.',
      headerBgClass: 'bg-info',
      iconClass: 'bi-gear-wide-connected',
      historyText: 'Consulta de atualizações realizada.'
    });
  });

  // 6. Confirmação e Limpeza do Histórico (Etapa 5)
  document.getElementById('btnConfirmClear').addEventListener('click', () => {
    historyList.innerHTML = `
      <li class="list-group-item text-center text-muted py-4" id="emptyHistoryMsg">
        Nenhuma ação registrada até o momento.
      </li>
    `;
    totalActions = 0;
    actionCounterEl.textContent = totalActions;
    bsConfirmModal.hide();
  });
});
