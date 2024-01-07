export function downloadFromBase64(base64Data: string, filename: string) {
  // 将base64字符串转换为Blob
  const blob = base64ToBlob(base64Data);
  if (!blob) {
    console.error('无法创建Blob对象');
    return;
  }

  // 创建一个隐藏的<a>元素用于下载
  const a = document.createElement('a');
  a.style.display = 'none';
  document.body.appendChild(a);

  // 使用Blob对象创建一个URL，并设置为<a>元素的href属性
  const url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = filename;

  // 触发<a>元素的点击事件以开始下载
  a.click();

  // 清理
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}

// 辅助函数：将Base64字符串转换为Blob对象
function base64ToBlob(base64: string): Blob | null {
  // 正则表达式分割数据类型和Base64数据
  const parts = base64.match(/^data:(.+);base64,(.+)$/);
  if (parts === null) {
    return null;
  }

  const contentType = parts[1];
  const raw = window.atob(parts[2]);
  const rawLength = raw.length;
  const array = new Uint8Array(rawLength);

  // 将字符转换为字节
  for (let i = 0; i < rawLength; i++) {
    array[i] = raw.charCodeAt(i);
  }

  return new Blob([array], { type: contentType });
}
