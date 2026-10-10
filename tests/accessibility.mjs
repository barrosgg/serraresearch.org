import AxeBuilder from '@axe-core/playwright';

// Keep all axe findings. Classify the documented brand-color limitation separately.
export async function auditAccessibility(page) {
  const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
  result.brandContrastExceptions=[];
  result.unexpectedViolations=[];
  for(const violation of result.violations) {
    const unexpected=[];
    for(const node of violation.nodes) {
      const known=violation.id==='color-contrast'&&await page.evaluate(target=>{
        if(target.length!==1||typeof target[0]!=='string')return false;
        const element=document.querySelector(target[0]);
        const button=element?.closest('.button:not(.button-blue):not(.button-outline):not(:disabled)');
        if(!element||!button)return false;
        return getComputedStyle(button).backgroundColor==='rgb(253, 86, 56)'&&getComputedStyle(element).color==='rgb(255, 255, 255)';
      },node.target);
      if(known)result.brandContrastExceptions.push({id:violation.id,url:page.url(),target:node.target,summary:node.failureSummary});
      else unexpected.push(node);
    }
    if(unexpected.length)result.unexpectedViolations.push({...violation,nodes:unexpected});
  }
  return result;
}
