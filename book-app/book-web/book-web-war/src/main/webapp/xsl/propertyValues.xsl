<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:transform xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0" >
  <xsl:template match="properties">
    <xsl:for-each select="./property">
      <xsl:value-of select="text()" />
      <xsl:text>  </xsl:text>
    </xsl:for-each>
  </xsl:template>
</xsl:transform>