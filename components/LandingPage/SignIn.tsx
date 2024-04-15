import { useNeynarProvider } from '@/providers/NeynarProvider';
import { useCallback, useState } from 'react';

const Signin = () => {
  const { signer } = useNeynarProvider();
  const [theme, setTheme] = useState('light');
  const [variant, setVariant] = useState('neynar');
  const [logoSize, setLogoSize] = useState('30px');
  const [height, setHeight] = useState('48px');
  const [width, setWidth] = useState('218px');
  const [borderRadius, setBorderRadius] = useState('10px');
  const [fontSize, setFontSize] = useState('16px');
  const [fontWeight, setFontWeight] = useState('300');
  const [padding, setPadding] = useState('8px 15px');
  const [margin, setMargin] = useState('0px');
  const [text, setText] = useState('hello');
  const [color, setColor] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('');
  const [styles, setStyles] = useState('');
  const [customLogoUrl, setCustomLogoUrl] = useState('');

  const client_id = process.env.NEXT_PUBLIC_NEYNAR_CLIENT_ID;
  const neynar_login_url =
    process.env.NEXT_PUBLIC_NEYNAR_LOGIN_URL || 'https://app.neynar.com/login';

  if (!client_id) {
    throw new Error('NEXT_PUBLIC_NEYNAR_CLIENT_ID is not defined in .env');
  }

  const getButton = useCallback(() => {
    return (
      <div
        className="neynar_signin mt-6"
        data-client_id={client_id}
        data-neynar_login_url={neynar_login_url}
        data-success-callback="onSignInSuccess"
        data-theme="light"
        data-variant="neynar"
        data-logo_size={logoSize}
        data-height={height}
        data-width={width}
        data-border_radius={borderRadius}
        data-font_size={fontSize}
        data-font_weight={fontWeight}
        data-padding={padding}
        data-margin={margin}
        data-text={text}
        data-color={color}
        data-background_color={backgroundColor}
        data-styles={styles}
        data-custom_logo_url={customLogoUrl}
      ></div>
    );
  }, [
    theme,
    variant,
    logoSize,
    height,
    width,
    borderRadius,
    fontSize,
    fontWeight,
    padding,
    margin,
    text,
    color,
    backgroundColor,
    styles,
    customLogoUrl,
  ]);

  return <div className="mx-5 flex flex-col items-center justify-center">{getButton()}</div>;
};

export default Signin;
