import PolicyInputForm from '../PolicyInputForm';

export default function PolicyInputFormExample() {
  return (
    <PolicyInputForm 
      onAnalyze={(data) => console.log('Form submitted:', data)} 
    />
  );
}
