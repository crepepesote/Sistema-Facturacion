DROP TABLE IF EXISTS FACTURA;
DROP TABLE IF EXISTS LOTE;
DROP TABLE IF EXISTS METODO_PAGO;
DROP TABLE IF EXISTS PERSONA;
DROP TABLE IF EXISTS PRODUCTO;
DROP TABLE IF EXISTS PRODUCTO_FACTURA;
DROP TABLE IF EXISTS PRODUCTO_LOTE;
DROP TABLE IF EXISTS USUARIO_PERSONA;

CREATE TABLE FACTURA
(
   id_factura           INT NOT NULL AUTO_INCREMENT,
   id_metodo_pago       INT NOT NULL,
   id_persona           INT NOT NULL,
   fecha_factura        DATE NOT NULL,
   total_factura        FLOAT NOT NULL,
   id_vendedor          INT NOT NULL,
   numero_factura       VARCHAR(100) NOT NULL,
   PRIMARY KEY (id_factura)
);

CREATE TABLE LOTE
(
   id_lote              INT NOT NULL AUTO_INCREMENT,
   numero_lote          VARCHAR(100) NOT NULL,
   PRIMARY KEY (id_lote)
);

CREATE TABLE METODO_PAGO
(
   id_metodo_pago       INT NOT NULL AUTO_INCREMENT,
   tipo_metodo_pago     VARCHAR(100) NOT NULL,
   referencia_pago      VARCHAR(100) NOT NULL,
   PRIMARY KEY (id_metodo_pago)
);

CREATE TABLE PERSONA
(
   id_persona           INT NOT NULL AUTO_INCREMENT,
   documento_per        VARCHAR(100) NOT NULL,
   nombre_per           VARCHAR(200) NOT NULL,
   apellido_per         VARCHAR(200) NOT NULL,
   fecha_nacimiento     DATE NOT NULL,
   direccion_per        VARCHAR(200) NOT NULL,
   tipo_documento_per   VARCHAR(100) NOT NULL,
   telefono_per         VARCHAR(100),
   correo_per           VARCHAR(200),
   PRIMARY KEY (id_persona)
);

CREATE TABLE PRODUCTO
(
   id_producto          INT NOT NULL AUTO_INCREMENT,
   nombre_pro           VARCHAR(100) NOT NULL,
   descripcion_pro      VARCHAR(300) NOT NULL,
   unidad_pro           VARCHAR(50) NOT NULL,
   PRIMARY KEY (id_producto)
);

CREATE TABLE PRODUCTO_FACTURA
(
   id_producto_factura  INT NOT NULL AUTO_INCREMENT,
   id_factura           INT NOT NULL,
   precio_unitario_venta FLOAT NOT NULL,
   cantidad_venta_producto INT NOT NULL,
   impuesto_producto    FLOAT NOT NULL,
   PRIMARY KEY (id_producto_factura)
);

CREATE TABLE PRODUCTO_LOTE
(
   id_lote              INT NOT NULL,
   id_producto          INT NOT NULL,
   precio_compra_producto_lote FLOAT NOT NULL,
   cantidad_producto_lote INT NOT NULL
);

CREATE TABLE USUARIO_PERSONA
(
   id_usuario_persona   INT NOT NULL AUTO_INCREMENT,
   id_persona           INT,
   login                VARCHAR(200) NOT NULL,
   clave                VARCHAR(200) NOT NULL,
   tipo_usuario         VARCHAR(200) NOT NULL,
   PRIMARY KEY (id_usuario_persona)
);

/*==============================================================*/
/* Foreign Keys                                                 */
/*==============================================================*/
ALTER TABLE FACTURA 
   ADD CONSTRAINT FK_FACTURA_ID_METOD_PG FOREIGN KEY (id_metodo_pago)
      REFERENCES METODO_PAGO (id_metodo_pago) 
      ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE FACTURA 
   ADD CONSTRAINT FK_PERSONA_ID_PERSONA FOREIGN KEY (id_persona)
      REFERENCES PERSONA (id_persona) 
      ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE PRODUCTO_FACTURA 
   ADD CONSTRAINT FK_FACTURA_VENTA_ID_FACTURA_VENTA FOREIGN KEY (id_factura)
      REFERENCES FACTURA (id_factura) 
      ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE PRODUCTO_LOTE 
   ADD CONSTRAINT FK_RELATIONSHIP_6 FOREIGN KEY (id_lote)
      REFERENCES LOTE (id_lote) 
      ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE PRODUCTO_LOTE 
   ADD CONSTRAINT FK_RELATIONSHIP_7 FOREIGN KEY (id_producto)
      REFERENCES PRODUCTO (id_producto) 
      ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE USUARIO_PERSONA 
   ADD CONSTRAINT FK_USUARIO_PERSONA_ID_USUARIO_PERSONA FOREIGN KEY (id_persona)
      REFERENCES PERSONA (id_persona) 
      ON DELETE RESTRICT ON UPDATE RESTRICT;
