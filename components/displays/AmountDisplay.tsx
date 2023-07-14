
interface AmountDisplayProps {
    amount: number
    className?: string
}
const AmountDisplay = ({amount, className}:AmountDisplayProps) => {

    const formatCentsToMoney = (amount: number) => {
        return (amount / 100).toLocaleString('en-US', {
            // ITS MXN BUT USD DOESNT HAVE THE MXN SYMBOL
            currency: "USD",
            style: 'currency',
        })
    }

    return (
            <div className={className}>{
                formatCentsToMoney(amount)
            }</div>
    )
}
export  default AmountDisplay