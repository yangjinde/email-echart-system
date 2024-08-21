<script lang="ts">
  import { writable } from 'svelte/store';

  // 定义表单输入字段的可写存储
  const from = writable('yangjinde@gmail.com');
  const to = writable('');
  const cc = writable('');
  const bcc = writable('');
  const subject = writable('');
  const body = writable('');

  // 定义错误状态存储
  const errors = writable({
    from: false,
    to: false,
    cc: false,
    bcc: false,
    subject: false,
    body: false,
  });

  // 校验邮箱格式的正则表达式
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  //验证邮箱是否合法
  function validateEmails(emails: string, requireAtLeastOne = false): boolean {
    const emailList = emails.split(';').map(email => email.trim());
    if (requireAtLeastOne && emailList.filter(email => email !== '').length === 0) {
      return false;
    }
    return emailList.every(email => email === '' || emailRegex.test(email));
  }

  //验证所有必填字段是否已填写
  function validateField(field: string, value: string): boolean {
    if (field === 'from') {
      return value.trim() !== '' && emailRegex.test(value);
    } else if (field === 'to') {
      return validateEmails(value, true); // 收件人至少需要一个有效邮箱
    } else if (field === 'cc' || field === 'bcc') {
      return validateEmails(value);
    } else {
      return value.trim() !== '';
    }
  }

  //失去焦点事件判断
  function handleBlur(event: Event) {
    const target = event.target as HTMLInputElement;
    const fieldName = target.id;
    const value = target.value;

    errors.update(err => {
      err[fieldName] = !validateField(fieldName, value);
      return err;
    });
  }

  //提交表单
  function handleSubmit(event: Event) {
    event.preventDefault();

    let hasError = false;
    errors.update(err => {
      err.from = !validateField('from', $from);
      err.to = !validateField('to', $to);
      err.cc = !validateField('cc', $cc);
      err.bcc = !validateField('bcc', $bcc);
      err.subject = !validateField('subject', $subject);
      err.body = !validateField('body', $body);

      hasError = err.from || err.to || err.cc || err.bcc || err.subject || err.body;

      return err;
    });

    //所有验证提供提交表单
    if (!hasError) {
      console.log('From:', $from);
      console.log('To:', $to);
      console.log('Cc:', $cc);
      console.log('Bcc:', $bcc);
      console.log('Subject:', $subject);
      console.log('Body:', $body);
      alert("恭喜，邮件发送成功！")
    }
  }
</script>

<main class="max-w-4xl mx-auto p-4">
  <h1 class="text-2xl font-bold mb-4">电子邮件客户端模拟器</h1>
  <form on:submit={handleSubmit} class="space-y-4">
    <div>
      <label for="from" class="block text-sm font-medium text-gray-700">发件人</label>
      <input id="from" bind:value={$from} type="text" class="mt-1 block w-full p-2 border {$errors.from ? 'border-red-500' : 'border-gray-300'} rounded-md" on:blur={handleBlur} disabled/>
      {#if $errors.from}
        <p class="text-red-500 text-xs mt-1">请输入有效的发件人邮箱地址</p>
      {/if}
    </div>
    <div>
      <label for="to" class="block text-sm font-medium text-gray-700">收件人</label>
      <input id="to" placeholder="必填，至少一个邮件，多个用;分隔" bind:value={$to} type="text" class="mt-1 block w-full p-2 border {$errors.to ? 'border-red-500' : 'border-gray-300'} rounded-md" on:blur={handleBlur} />
      {#if $errors.to}
        <p class="text-red-500 text-xs mt-1">请输入至少一个有效的收件人邮箱地址，多个地址用分号分隔</p>
      {/if}
    </div>
    <div>
      <label for="cc" class="block text-sm font-medium text-gray-700">抄送</label>
      <input id="cc" placeholder="非必填，多个用;分隔" bind:value={$cc} type="text" class="mt-1 block w-full p-2 border {$errors.cc ? 'border-red-500' : 'border-gray-300'} rounded-md" on:blur={handleBlur} />
      {#if $errors.cc}
        <p class="text-red-500 text-xs mt-1">请输入有效的抄送邮箱地址，多个地址用分号分隔</p>
      {/if}
    </div>
    <div>
      <label for="bcc" class="block text-sm font-medium text-gray-700">密送</label>
      <input id="bcc" placeholder="非必填，多个用;分隔" bind:value={$bcc} type="text" class="mt-1 block w-full p-2 border {$errors.bcc ? 'border-red-500' : 'border-gray-300'} rounded-md" on:blur={handleBlur} />
      {#if $errors.bcc}
        <p class="text-red-500 text-xs mt-1">请输入有效的密送邮箱地址，多个地址用分号分隔</p>
      {/if}
    </div>
    <div>
      <label for="subject" class="block text-sm font-medium text-gray-700">主题</label>
      <input id="subject" placeholder="请输入主题" bind:value={$subject} type="text" class="mt-1 block w-full p-2 border {$errors.subject ? 'border-red-500' : 'border-gray-300'} rounded-md" on:blur={handleBlur} />
      {#if $errors.subject}
        <p class="text-red-500 text-xs mt-1">主题不能为空</p>
      {/if}
    </div>
    <div>
      <label for="body" class="block text-sm font-medium text-gray-700">正文</label>
      <textarea id="body" placeholder="请输入正文……" bind:value={$body} class="mt-1 block w-full p-2 border {$errors.body ? 'border-red-500' : 'border-gray-300'} rounded-md" rows="6" on:blur={handleBlur}></textarea>
      {#if $errors.body}
        <p class="text-red-500 text-xs mt-1">正文不能为空</p>
      {/if}
    </div>
    <div>
      <button type="submit" id="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md">发送</button>
    </div>
  </form>
</main>
