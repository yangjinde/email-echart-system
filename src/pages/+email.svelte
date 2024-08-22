<script lang="ts">
  import { writable } from 'svelte/store';

  // Define writable storage for form input fields
  const from = writable('');
  const to = writable('');
  const cc = writable('');
  const bcc = writable('');
  const subject = writable('');
  const body = writable('');

  // Define error state storage
  const errors = writable({
    from: true,
    to: true,
    cc: false,
    bcc: false,
    subject: true,
    body: true,
  });

  // Validate regular expressions for email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  //Verify if the email is legitimate
  function validateEmails(emails: string, requireAtLeastOne = false): boolean {
    const emailList = emails.split(';').map(email => email.trim());
    if (requireAtLeastOne && emailList.filter(email => email !== '').length === 0) {
      return false;
    }
    return emailList.every(email => email === '' || emailRegex.test(email));
  }

  //Verify that all required fields have been filled in
  function validateField(field: string, value: string): boolean {
    if (field === 'from') {
      return value.trim() !== '' && emailRegex.test(value);
    } else if (field === 'to') {
      return validateEmails(value, true);
    } else if (field === 'cc' || field === 'bcc') {
      return validateEmails(value);
    } else {
      return value.trim() !== '';
    }
  }

  //Loss of focus event judgment
  function handleBlur(event: Event) {
    const target = event.target as HTMLInputElement;
    const fieldName = target.id;
    const value = target.value;

    errors.update(err => {
      err[fieldName] = !validateField(fieldName, value);
      return err;
    });
  }

  //Submit Form
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

    //All verifications provide submission forms
    if (!hasError) {
      sendEmail();
    }

    //send Mail
    async function sendEmail() {
      const to = $to;
      const cc = $cc;
      const bcc = $bcc;
      const subject = encodeURIComponent($subject);
      const body = encodeURIComponent($body);
      const mailToLink = 'mailto:'+to+'?subject='+subject+'&body='+body+'&cc='+cc+'&bcc='+bcc;
      window.open(mailToLink);
    }
  }
</script>

<main class="max-w-4xl mx-auto p-4">
  <h1 class="text-2xl font-bold mb-4">Email client simulator</h1>
  <form on:submit={handleSubmit} class="space-y-4">
    <div>
      <label for="from" class="block text-sm font-medium text-gray-700">From</label>
      <input id="from" placeholder="Required, need one email" bind:value={$from} type="text" class="mt-1 block w-full p-2 border {$errors.from ? 'border-red-500' : 'border-gray-300'} rounded-md" on:blur={handleBlur}/>
      {#if $errors.from}
        <p class="text-red-500 text-xs mt-1">Please enter a valid email address</p>
      {/if}
    </div>
    <div>
      <label for="to" class="block text-sm font-medium text-gray-700">To</label>
      <input id="to" data-testid="to" placeholder="Required, at least one email, multiple used; separate" bind:value={$to} type="text" class="mt-1 block w-full p-2 border {$errors.to ? 'border-red-500' : 'border-gray-300'} rounded-md" on:blur={handleBlur} />
      {#if $errors.to}
        <p class="text-red-500 text-xs mt-1">At least one valid recipient email address, multiple uses ; separate</p>
      {/if}
    </div>
    <div>
      <label for="cc" class="block text-sm font-medium text-gray-700">Cc</label>
      <input id="cc" placeholder="Not required, multiple use; separate" bind:value={$cc} type="text" class="mt-1 block w-full p-2 border {$errors.cc ? 'border-red-500' : 'border-gray-300'} rounded-md" on:blur={handleBlur} />
      {#if $errors.cc}
        <p class="text-red-500 text-xs mt-1">Please enter a valid email address, multiple uses ; separate</p>
      {/if}
    </div>
    <div>
      <label for="bcc" class="block text-sm font-medium text-gray-700">Bcc</label>
      <input id="bcc" placeholder="Not required, multiple use; separate" bind:value={$bcc} type="text" class="mt-1 block w-full p-2 border {$errors.bcc ? 'border-red-500' : 'border-gray-300'} rounded-md" on:blur={handleBlur} />
      {#if $errors.bcc}
        <p class="text-red-500 text-xs mt-1">Please enter a valid email address, multiple uses ; separate</p>
      {/if}
    </div>
    <div>
      <label for="subject" class="block text-sm font-medium text-gray-700">Subject</label>
      <input id="subject" placeholder="Please enter the subject" bind:value={$subject} type="text" class="mt-1 block w-full p-2 border {$errors.subject ? 'border-red-500' : 'border-gray-300'} rounded-md" on:blur={handleBlur} />
      {#if $errors.subject}
        <p class="text-red-500 text-xs mt-1">Subject cannot be empty</p>
      {/if}
    </div>
    <div>
      <label for="body" class="block text-sm font-medium text-gray-700">Body</label>
      <textarea id="body" placeholder="Please enter the body……" bind:value={$body} class="mt-1 block w-full p-2 border {$errors.body ? 'border-red-500' : 'border-gray-300'} rounded-md" rows="6" on:blur={handleBlur}></textarea>
      {#if $errors.body}
        <p class="text-red-500 text-xs mt-1">Body cannot be empty</p>
      {/if}
    </div>
    <div>
      <button type="submit" id="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md">Send</button>
    </div>
  </form>
</main>
