import { useState } from 'react'
import SimpleConvert from '../components/SimpleConvert'
import SwapHome from '../components/SwapHome';

export default function Swap() {

  const [start, setStart] = useState(false);
  const [selectedDao, setSelectedDao] = useState<string>("");

  const handleNextButtonClick = (clicked: boolean, dao: string) => {
    setStart(clicked);
    setSelectedDao(dao);
  };

  if(start) {
    return (
      <>
        <SimpleConvert dao={selectedDao}/>
      </>
    )
  } else {
    return(
      <>
        <SwapHome onNextButtonClick={handleNextButtonClick} />
      </>
    )
  }
}