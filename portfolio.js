// 双重检测：屏幕尺寸 + UserAgent
    function isPC() {
      // 屏幕宽度阈值（可自定义调整）
      const minWidth = 1200;  // 常见笔记本最小宽度
      const minHeight = 600;
      
      // 屏幕尺寸检测
      const isLargeScreen = window.screen.width >= minWidth && window.screen.height >= minHeight;
      
      // UserAgent辅助检测
      const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      return isLargeScreen && !isMobileUA;
    }

    if (isPC()) {
      document.write('<iframe src="https://pdfjm.cn/api/pdf/pdf?id=MTMzMTgy" width="100%" height="100%" frameborder="0"></iframe>'); // 替换为目标网址
    } else {
      document.write('<h3>请使用电脑浏览器打开此链接</h3>');
    }