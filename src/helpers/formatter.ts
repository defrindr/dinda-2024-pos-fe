const idrCurrency = (num: number) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'IDR'
  })

  return formatter.format(num)
}

export { idrCurrency }
