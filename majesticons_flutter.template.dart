import 'dart:typed_data';
import 'package:flutter_svg/svg.dart';
import 'package:flutter/material.dart';

class Majesticon extends StatelessWidget {
  //ICONS

  final Uint8List data;
  final Color color;
  final double? size;

  const Majesticon(
    this.data, {
    Key? key,
    this.color = Colors.white,
    this.size,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SvgPicture.memory(
      data,
      color: color,
      height: size,
    );
  }
}
