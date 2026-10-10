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
        if(!element)return false;
        const style=getComputedStyle(element);
        const button=element?.closest('.button:not(.button-blue):not(.button-outline):not(:disabled)');
        if(button)return getComputedStyle(button).backgroundColor==='rgb(253, 86, 56)'&&style.color==='rgb(255, 255, 255)';
        if(!element.matches('.section-heading .eyebrow'))return false;
        const section=element.closest('section');
        const backgrounds={atuacao:'rgb(244, 245, 248)',projetos:'rgb(244, 245, 248)',publicacoes:'rgb(240, 243, 250)'};
        let surface=element.parentElement;
        while(surface&&getComputedStyle(surface).backgroundColor==='rgba(0, 0, 0, 0)')surface=surface.parentElement;
        return !!section&&!!surface&&backgrounds[section.id]===getComputedStyle(surface).backgroundColor&&style.backgroundColor==='rgba(0, 0, 0, 0)'&&style.color==='rgb(253, 86, 56)'&&parseFloat(style.fontSize)>=19&&Number(style.fontWeight)>=700;
      },node.target);
      if(known)result.brandContrastExceptions.push({id:violation.id,url:page.url(),target:node.target,summary:node.failureSummary});
      else unexpected.push(node);
    }
    if(unexpected.length)result.unexpectedViolations.push({...violation,nodes:unexpected});
  }
  return result;
}
