// ˫�ؼ�⣺��Ļ�ߴ� + UserAgent
    function isPC() {
      // ��Ļ�����ֵ�����Զ��������
      const minWidth = 1200;  // �����ʼǱ���С���
      const minHeight = 600;
      
      // ��Ļ�ߴ���
      const isLargeScreen = window.screen.width >= minWidth && window.screen.height >= minHeight;
      
      // UserAgent�������
      const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      return isLargeScreen && !isMobileUA;
    }

    if (isPC()) {
      document.write('<iframe src="https://pdfjm.cn/api/pdf/pdf?id=MTMzMTgy" width="100%" height="100%" frameborder="0"></iframe>'); // �滻ΪĿ����ַ
    } else {
      document.write('<h3>��ʹ�õ���������򿪴�����</h3>');
    }