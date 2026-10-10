import {researchDesign} from './research-design';
/** Documented production values. Smoke checks compare semantic colors with computed CSS. */
export const designTokens = {
 name:'Serra Research', version:'2.0', research:researchDesign, updated:'2026-10-10',
 colors:{orange:'#fd5638',orangeInk:'#b83b24',actionOrange:'#ff896b',buttonInk:'#442017',accentText:'#dd452b',dataBlue:'#0057ff',blueInk:'#0049cf',blueSoft:'#eef3ff',charcoal:'#2e2e2e',body:'#494a4d',muted:'#676a73',snow:'#f4f5f8',line:'#dfe1ea',white:'#ffffff',darkSurface:'#303238',warmSurface:'#fff7f2',territorySurface:'#edf1ee'},
 typography:{sans:'Space Grotesk',mono:'JetBrains Mono',weights:[400,500,600],body:17,bodyLineHeight:1.75,textScale:[1,1.3],hero:{desktop:'clamp(42px, 4vw, 62px)',tablet:50,mobile:42,lineHeight:1.08},section:{desktop:40,mobile:33},serviceTitle:{desktop:29,mobile:26},button:15,monoSize:11},
 spacing:[4,8,12,16,20,24,32,40,48,64],
 radii:{field:8,navigation:10,icon:13,card:20,serviceDialog:24,panel:28,pill:100},
 layout:{containerMax:1180,sidebar:248,mobileDrawer:290,desktopGutter:40,tabletGutter:32,mobileGutter:20,sectionSpace:92,mobileSectionSpace:65,serviceDialogMax:1040,preferencesDialogMax:660,breakpoints:[1100,900,800,650,600,480]},
 motion:{buttonMs:200,cardMs:250,drawerMs:250,buttonHoverY:-2,cardHoverY:-4,scroll:'smooth',reducedMotion:'no animation or transitions; auto scroll'},
 accessibility:{primaryTargetMin:44,focusWidth:2,focusOffset:5,contrastNormal:4.5,contrastLarge:3,textScaleMax:1.3},
} as const;
export const colorEntries = [
 ['actionOrange','--action-orange','Ações principais','Primary actions'],['buttonInk','--button-ink','Texto sobre coral claro','Text on light coral'],
 ['dataBlue','--data-blue','Dados, IA e ação azul','Data, AI and blue actions'],['blueInk','--blue-ink','Links e rótulos azuis','Blue links and labels'],
 ['orange','--orange','Marca, ícones e elementos gráficos','Brand, icons and graphics'],['orangeInk','--orange-ink','Texto coral e foco','Coral text and focus'],
 ['accentText','--accent-text','Destaques em títulos grandes','Large heading accents'],['charcoal','--charcoal','Títulos e hierarquia','Headings and hierarchy'],
 ['body','color','Texto principal','Body text'],['muted','--muted','Texto de apoio','Supporting text'],
 ['snow','--snow','Fundo da página','Page background'],['white','surface','Cards e leitura','Cards and reading'],
 ['blueSoft','--blue-soft','Contexto e seleção','Context and selection'],['line','--line','Bordas e separadores','Borders and dividers'],
 ['darkSurface','surface-dark','Painéis de destaque','Featured panels'],['warmSurface','surface-warm','Serviços proprietários','Proprietary services'],
 ['territorySurface','surface-territory','Aplicações territoriais','Territorial applications'],
] as const;
export function contrastRatio(foreground:string,background:string){
 const luminance=(hex:string)=>{const channels=hex.replace('#','').match(/.{2}/g)!.map(c=>parseInt(c,16)/255).map(c=>c<=.04045?c/12.92:((c+.055)/1.055)**2.4);return channels[0]*.2126+channels[1]*.7152+channels[2]*.0722;};
 const values=[luminance(foreground),luminance(background)].sort((a,b)=>b-a);return (values[0]+.05)/(values[1]+.05);
}
export const contrastPairs=[
 {foreground:designTokens.colors.buttonInk,background:designTokens.colors.actionOrange,label:['Botão coral','Coral button'],large:false},
 {foreground:designTokens.colors.white,background:designTokens.colors.dataBlue,label:['Botão azul','Blue button'],large:false},
 {foreground:designTokens.colors.blueInk,background:designTokens.colors.white,label:['Link azul','Blue link'],large:false},
 {foreground:designTokens.colors.muted,background:designTokens.colors.snow,label:['Texto de apoio','Supporting text'],large:false},
 {foreground:designTokens.colors.orangeInk,background:designTokens.colors.white,label:['Texto coral','Coral text'],large:false},
 {foreground:designTokens.colors.accentText,background:designTokens.colors.snow,label:['Título coral grande','Large coral heading'],large:true},
];
